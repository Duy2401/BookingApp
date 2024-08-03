const moment = require("moment");
const HotelBooking = require("../models/Booking/HotelBooking");
const RoomType = require("../models/Hotel/roomType");
const Payment = require("../models//PaymentSchema");
let config = require("../configs/momo/default.json");

const paymentController = {
  createBooking: async (req, res) => {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    const { customer, hotelID, rooms, totalPrice } = req.body;
    const holdDuration = 30 * 60 * 1000; // 30 phút tính bằng milliseconds
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
      hold_status: "on_hold",
      payment_status: "pending",
    });

    const CreateHotelBooking = await newBooking.save();

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;
    let vnpUrl = config.vnp_Url;
    let returnUrl = config.vnp_ReturnUrl;
    let amount = totalPrice;
    let bankCode = "NCB";

    let locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = CreateHotelBooking._id;
    vnp_Params["vnp_OrderInfo"] =
      "Thanh toan cho ma GD:" + CreateHotelBooking._id;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    // Lưu thông tin thanh toán
    const newPayment = new Payment({
      orderId: CreateHotelBooking._id,
      amount: totalPrice,
      paymentStatus: "pending",
      type: "hotel",
    });
    await newPayment.save();

    res.set("Content-Type", "text/html");
    res.json(vnpUrl);
  },
  returnBooking: async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = config.vnp_TmnCode;
    let secretKey = config.vnp_HashSecret;

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      let orderId = vnp_Params["vnp_TxnRef"];
      let rspCode = vnp_Params["vnp_ResponseCode"];
      console.log(orderId);
      // Tìm và cập nhật trạng thái thanh toán
      let payment = await Payment.findOne({ orderId });
      if (!payment) {
        return res
          .status(404)
          .json({ status: false, message: "Payment not found" });
      }

      if (rspCode === "00") {
        payment.paymentStatus = "success";
      } else {
        payment.paymentStatus = "failure";
      }

      await payment.save();

      res.json({
        status: true,
        message: "Payment status updated",
        code: rspCode,
      });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Checksum failed", code: "97" });
    }
  },
  checkStatus: async (req, res) => {
    try {
      let vnp_Params = req.query;
      let secureHash = vnp_Params["vnp_SecureHash"];

      let orderId = vnp_Params["vnp_TxnRef"];
      let rspCode = vnp_Params["vnp_ResponseCode"];
      let amount = parseInt(vnp_Params["vnp_Amount"]) / 100; // Convert amount to dollars or relevant currency unit

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      vnp_Params = sortObject(vnp_Params);
      let secretKey = config.get("vnp_HashSecret");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

      if (secureHash === signed) {
        // Check checksum
        let payment = await Payment.findOne({ orderId });

        if (!payment) {
          return res
            .status(200)
            .json({ RspCode: "01", Message: "Order not found" });
        }

        // Verify amount
        if (payment.amount !== amount) {
          return res
            .status(200)
            .json({ RspCode: "04", Message: "Amount invalid" });
        }

        // Check payment status
        let bookingUpdateStatus = false;
        if (payment.paymentStatus === "0") {
          // Update payment status
          if (rspCode === "00") {
            payment.paymentStatus = "success";
            bookingUpdateStatus = true;
          } else {
            payment.paymentStatus = "failure";
          }
          await payment.save();

          // Update hotel booking status
          if (bookingUpdateStatus) {
            let booking = await HotelBooking.findOne({ orderId });

            if (booking) {
              booking.payment_status = "confirmed"; // Or any relevant status for successful booking
              await booking.save();
            } else {
              // Handle case where booking is not found
              console.error("Booking not found for orderId:", orderId);
            }
          }

          res.status(200).json({ RspCode: "00", Message: "Success" });
        } else {
          res.status(200).json({
            RspCode: "02",
            Message: "This order has already been updated",
          });
        }
      } else {
        return res
          .status(200)
          .json({ RspCode: "97", Message: "Checksum failed" });
      }
    } catch (error) {
      console.error("Error handling VNPAY IPN:", error);
      return res
        .status(500)
        .json({ RspCode: "99", Message: "Internal server error" });
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
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

module.exports = paymentController;
