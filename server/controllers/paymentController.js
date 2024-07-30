const BookingHotel = require("../models/Booking/booking");
const Payment = require("../models/payment");
const crypto = require("crypto");
const config = require("../configs/momo/momo");
const axios = require("axios");

const paymentController = {
  createBooking: async (req, res) => {
    let {
      accessKey,
      secretKey,
      orderInfo,
      partnerCode,
      redirectUrl,
      ipnUrl,
      requestType,
      extraData,
      orderGroupId,
      autoCapture,
      lang,
    } = config;

    const { amount, bookingDetails, customers } = req.body;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;

    const rawSignature = [
      `accessKey=${accessKey}`,
      `amount=${amount}`,
      `extraData=${extraData}`,
      `ipnUrl=${ipnUrl}`,
      `orderId=${orderId}`,
      `orderInfo=${orderInfo}`,
      `partnerCode=${partnerCode}`,
      `redirectUrl=${redirectUrl}`,
      `requestId=${requestId}`,
      `requestType=${requestType}`,
    ].join("&");

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      orderGroupId,
      signature,
    };

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(requestBody)),
      },
      data: requestBody,
    };

    try {
      const result = await axios(options);
      // Save the booking details to the database or any other necessary operation
      const booking = new BookingHotel({
        bookingDetails,
        customers,
        amount,
        orderId,
        status: "pending", // or any other initial status
      });
      await booking.save();

      // Return MoMo response and necessary booking details
      return res.status(200).json({
        momoResponse: result.data,
        bookingDetails,
      });
    } catch (error) {
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  },

  returnBooking: async (req, res) => {
    const query = req.query;
    // Xử lý kết quả trả về từ MoMo và cập nhật trạng thái booking trong database
    const { orderId, resultCode } = query;

    try {
      const booking = await BookingHotel.findOne({ orderId });
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      booking.status = resultCode === "0" ? "success" : "failed"; // cập nhật trạng thái tùy thuộc vào mã kết quả
      await booking.save();

      res.json({
        message: "Booking status updated",
        booking,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  },
};

module.exports = paymentController;
