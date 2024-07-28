const crypto = require("crypto");
const querystring = require("querystring");
const Booking = require("../models/Booking/booking");
const config = require("../configs/vnpays/vnpay"); // Your VNPay config

// Initiate VNPay Payment
const initiateVNPayPayment = (req, res) => {
  try {
    const {
      hotelId,
      customerId,
      rooms,
      checkInDate,
      checkOutDate,
      totalPrice,
    } = req.body;

    console.log("Request body:", req.body);

    if (
      !hotelId ||
      !customerId ||
      !rooms ||
      !checkInDate ||
      !checkOutDate ||
      !totalPrice
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const bookingDetails = {
      hotelId,
      customerId,
      rooms,
      checkInDate,
      checkOutDate,
      totalPrice,
    };

    req.session.bookingDetails = bookingDetails;

    const vnpUrl = config.vnp_Url;
    const returnUrl = config.vnp_ReturnUrl;
    const tmnCode = config.vnp_TmnCode;
    const secretKey = config.vnp_HashSecret;

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: Date.now().toString(),
      vnp_OrderInfo: "Payment for booking",
      vnp_OrderType: "other",
      vnp_Amount: totalPrice * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: req.ip,
      vnp_CreateDate: new Date().toISOString(),
    };

    vnp_Params = sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;

    const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, {
      encode: false,
    })}`;

    res.json({ paymentUrl });
  } catch (error) {
    console.error("Error in initiateVNPayPayment:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Handle VNPay Return
const handleVNPayReturn = async (req, res) => {
  let vnp_Params = req.query;

  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    if (vnp_Params["vnp_ResponseCode"] === "00") {
      try {
        const bookingDetails = req.session.bookingDetails;
        console.log(req.session.bookingDetails);
        if (!bookingDetails) {
          return res.status(400).json({ message: "No booking details found" });
        }

        const newBooking = new Booking({
          hotel: bookingDetails.hotelId,
          customer: bookingDetails.customerId,
          rooms: bookingDetails.rooms,
          checkInDate: bookingDetails.checkInDate,
          checkOutDate: bookingDetails.checkOutDate,
          totalPrice: bookingDetails.totalPrice,
          status: "confirmed",
        });
        await newBooking.save();

        res.json({
          message: "Payment successful, booking created",
          booking: newBooking,
        });
      } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking", error });
      }
    } else {
      res.json({ message: "Payment failed", vnp_Params });
    }
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};

function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

module.exports = {
  handleVNPayReturn,
  initiateVNPayPayment,
};
