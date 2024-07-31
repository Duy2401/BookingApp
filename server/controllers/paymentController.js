const BookingHotel = require("../controllers/Books/bookingHotelController");
const crypto = require("crypto");
// const config = require("../configs/momo/momo");
const moment = require("moment");
const axios = require("axios");
const sendPaymentSuccessEmail = require("../configs/momo/sendEmail");
let config = require("../configs/momo/default.json");
const paymentController = {
  createBooking: async (req, res) => {
    process.env.TZ = "Asia/Ho_Chi_Minh";

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
    let amount = 100000;
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
    vnp_Params["vnp_TxnRef"] = "123141";
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + "123141";
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
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res.json("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.render("success", { code: "97" });
    }
  },

  // createBooking: async (req, res) => {
  //   let {
  //     accessKey,
  //     secretKey,
  //     orderInfo,
  //     partnerCode,
  //     redirectUrl,
  //     ipnUrl,
  //     requestType,
  //     extraData,
  //     orderGroupId,
  //     autoCapture,
  //     lang,
  //   } = config;

  //   const { amount } = req.body;
  //   const orderId = partnerCode + new Date().getTime();
  //   const requestId = orderId;

  //   // Sign HMAC SHA256
  //   const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  //   const signature = crypto
  //     .createHmac("sha256", secretKey)
  //     .update(rawSignature)
  //     .digest("hex");

  //   // Create request body
  //   const requestBody = JSON.stringify({
  //     partnerCode,
  //     partnerName: "Test",
  //     storeId: "MomoTestStore",
  //     requestId,
  //     amount,
  //     orderId,
  //     orderInfo,
  //     redirectUrl,
  //     ipnUrl,
  //     lang,
  //     requestType,
  //     autoCapture,
  //     extraData,
  //     orderGroupId,
  //     signature,
  //   });

  //   // Send request to MoMo
  //   try {
  //     const response = await axios.post(
  //       "https://test-payment.momo.vn/v2/gateway/api/create",
  //       requestBody,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Content-Length": Buffer.byteLength(requestBody),
  //         },
  //       }
  //     );
  //     res.status(200).json(response.data);
  //   } catch (error) {
  //     res.status(500).json({ statusCode: 500, message: error.message });
  //   }
  // },

  // returnBooking: async (req, res) => {
  //   console.log("Received query:", req.query);
  //   const { orderId, amount, status, transactionId } = req.query;

  //   // Determine payment status
  //   const paymentStatus = status === "success" ? "success" : "failure";

  //   if (paymentStatus === "success") {
  //     try {
  //       // Fetch booking details
  //       const booking = await BookingHotel.findOne({ orderId });

  //       if (!booking) {
  //         return res.status(404).json({ message: "Booking not found" });
  //       }

  //       // Save payment information
  //       const paymentData = {
  //         orderId,
  //         amount,
  //         paymentStatus,
  //         status: "confirmed",
  //         type: "hotel",
  //         transactionId,
  //         hotel: booking.hotel, // Ensure this is populated
  //         customer: booking.customer, // Ensure this is populated
  //         checkInDate: booking.checkInDate, // Ensure this is populated
  //         checkOutDate: booking.checkOutDate, // Ensure this is populated
  //         totalPrice: booking.totalPrice, // Ensure this is populated
  //         rooms: booking.rooms, // Ensure this is populated if needed
  //       };

  //       await BookingHotel.create(paymentData);

  //       // Send payment success email
  //       const mailOptions = {
  //         to: booking.customerEmail, // Ensure email is available
  //         subject: "Payment Successful",
  //         text: `Your payment of ${amount} for booking ${orderId} was successful.`,
  //       };
  //       await sendPaymentSuccessEmail(mailOptions);
  //       console.log("Payment success email sent.");

  //       res.json({ message: "Payment successful and booking updated." });
  //     } catch (error) {
  //       console.error("Error in returnBooking:", error);
  //       res.status(500).json({ statusCode: 500, message: error.message });
  //     }
  //   } else {
  //     res.status(400).json({ message: "Payment failed" });
  //   }
  // },

  checkStatus: async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "orderId is required" });
    }

    const { accessKey, secretKey, partnerCode, lang } = config;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode,
      requestId: orderId,
      orderId,
      signature,
      lang,
    });

    try {
      const result = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/query",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Payment status response:", result.data);
      res.status(200).json(result.data);
    } catch (error) {
      console.error("Error checking payment status:", error);
      res.status(500).json({ statusCode: 500, message: error.message });
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
