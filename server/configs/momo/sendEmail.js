const transporter = require("../../helpers/transporter");

async function sendPaymentSuccessEmail(bookingDetails) {
  const mailOptions = {
    from: "longduy2410@gmail.com",
    to: `${bookingDetails.customer_id}`,
    subject: "Payment Successful",
    text: `Dear Customer,

        Your payment for booking ${bookingDetails.bookingId} has been successfully processed.

        Booking Details:
        Hotel: ${bookingDetails.hotelName}
        Room Type: ${bookingDetails.roomType}
        Check-In Date: ${bookingDetails.checkInDate}
        Check-Out Date: ${bookingDetails.checkOutDate}
        Total Amount: ${bookingDetails.totalAmount}

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
