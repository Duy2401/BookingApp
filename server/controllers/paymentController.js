// controllers/paymentController.js (continued)
const handleVNPayReturn = (req, res) => {
  let vnp_Params = req.query;

  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    // Check payment result in vnp_Params['vnp_ResponseCode']
    if (vnp_Params["vnp_ResponseCode"] === "00") {
      // Payment success
      res.json({ message: "Payment successful", vnp_Params });
    } else {
      // Payment failed
      res.json({ message: "Payment failed", vnp_Params });
    }
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};

module.exports = {
  handleVNPayReturn,
};
