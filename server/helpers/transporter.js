const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "longduy2410@gmail.com",
    pass: "longduy@0202", // Ideally, use environment variables for sensitive information
  },
});

module.exports = transporter;
