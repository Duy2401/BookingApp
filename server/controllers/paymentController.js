const moment = require('moment');
const HotelBooking = require('../models/Booking/HotelBooking');
const RoomType = require('../models/Hotel/roomType');
const Payment = require('../models//PaymentSchema');
let config = require('../configs/momo/default.json');

const paymentController = {
  createBooking: async (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const { customer, hotelID, rooms, totalPrice } = req.body;
    const holdDuration = 10 * 60 * 1000; // 10 phút tính bằng milliseconds
    const holdUntil = new Date(Date.now() + holdDuration);

    const updatedRooms = [];

    for (const room of rooms) {
      const { roomId, quantity } = room;

      const roomType = await RoomType.findOneAndUpdate(
        { _id: roomId, totalRooms: { $gte: quantity } },
        { $inc: { totalRooms: -quantity, bookedRooms: quantity } },
        { new: true }
      );

      if (!roomType) {
        return res.status(400).json({
          status: false,
          message: `No available rooms for the specified room type: ${roomId}`,
        });
      }

      updatedRooms.push({ roomId, quantity });
    }

    const newBooking = new HotelBooking({
      ...req.body,
      customer,
      hotelID,
      rooms: updatedRooms,
      hold_until: holdUntil,
      hold_status: 'on_hold',
      payment_status: 'pending',
    });

    const CreateHotelBooking = await newBooking.save();

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let amount = totalPrice;
    let bankCode = 'NCB';

    let locale = req.body.language;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = CreateHotelBooking._id;
    vnp_Params['vnp_OrderInfo'] =
      'Thanh toan cho ma GD:' + CreateHotelBooking._id;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let crypto = require('crypto');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    // Lưu thông tin thanh toán
    const newPayment = new Payment({
      orderId: CreateHotelBooking._id,
      amount: totalPrice,
      paymentStatus: 'pending',
      type: 'hotel',
    });
    await newPayment.save();

    res.set('Content-Type', 'text/html');
    res.json(vnpUrl);
  },
  returnBooking: async (req, res) => {
    try {
      let vnp_Params = req.query;
      let secureHash = vnp_Params['vnp_SecureHash'];

      delete vnp_Params['vnp_SecureHash'];
      delete vnp_Params['vnp_SecureHashType'];

      vnp_Params = sortObject(vnp_Params);

      let querystring = require('qs');
      let crypto = require('crypto');
      let secretKey = config.vnp_HashSecret;
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let hmac = crypto.createHmac('sha512', secretKey);
      let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

      if (secureHash === signed) {
        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];
        console.log('OrderId:', orderId);

        // Tìm và cập nhật trạng thái thanh toán
        let payment = await Payment.findOne({ orderId });
        if (!payment) {
          return res
            .status(404)
            .json({ status: false, message: 'Payment not found' });
        }

        let bookingUpdateStatus = false;
        if (rspCode === '00') {
          payment.paymentStatus = 'success';
          bookingUpdateStatus = true;
        } else {
          payment.paymentStatus = 'failure';
        }

        await payment.save();

        // Update hotel booking status if payment was successful
        if (bookingUpdateStatus) {
          let booking = await HotelBooking.findById(orderId);

          if (booking) {
            booking.payment_status = 'completed';
            booking.hold_status = 'released'; // Or any relevant status for successful booking
            await booking.save();
          } else {
            // Handle case where booking is not found
            console.error('Booking not found for orderId:', orderId);
          }
        }

        res.json({
          status: true,
          message: 'Payment status updated',
          code: rspCode,
        });
      } else {
        res
          .status(400)
          .json({ status: false, message: 'Checksum failed', code: '97' });
      }
    } catch (error) {
      console.error('Error handling VNPAY return:', error);
      return res
        .status(500)
        .json({ status: false, message: 'Internal server error', code: '99' });
    }
  },
  getAllPayment: async (req, res) => {
    try {
      // Tìm các booking với hotelID
      const bookings = await HotelBooking.find({
        hotelID: req.params.id,
        payment_status: 'completed',
      }).select('_id');

      if (!bookings.length) {
        return res.status(404).json({
          status: false,
          message: 'Không có booking nào được tìm thấy',
        });
      }

      const bookingIds = bookings.map((booking) => booking._id.toString());

      // Tìm các payment liên quan đến các booking trên
      const payments = await Payment.aggregate([
        {
          $match: {
            orderId: { $in: bookingIds },
            paymentStatus: 'success',
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$createDate' },
              year: { $year: '$createDate' },
            },
            totalRevenue: { $sum: '$amount' },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 },
        },
      ]);

      return res.json({
        status: true,
        message: 'Get statistical success',
        data: payments,
      });
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
  },
};

const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
};

module.exports = paymentController;
