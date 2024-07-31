const transporter = require("../../helpers/transporter");

async function sendPaymentSuccessEmail() {
  const mailOptions = {
    from: "longduy2410@gmail.com",
    to: "duynld2210@gmail.com",
    subject: "Payment Successful",
    text: `Dear Customer,

        tao dang test m co nhận được chưa v

        Thank you for booking with us!

        Best regards,
        Booking !!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendPaymentSuccessEmail;
