// cleanExpiredBookings.js
const cron = require("node-cron");
const moment = require("moment");
const HotelBooking = require("../models/Booking/HotelBooking"); // Đảm bảo bạn có đường dẫn đúng
const Payment = require("../models/PaymentSchema"); // Đảm bảo bạn có đường dẫn đúng
const RoomType = require("../models/Hotel/roomType"); // Đảm bảo bạn có đường dẫn đúng

// Đặt lịch công việc mỗi phút kiểm tra các booking đã hết hạn
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const expiredBookings = await HotelBooking.find({
      hold_status: "on_hold",
      hold_until: { $lt: now },
      payment_status: "pending",
    });

    for (const booking of expiredBookings) {
      // Trả lại số phòng đã đặt
      for (const room of booking.rooms) {
        const { roomId, quantity } = room;
        await RoomType.findByIdAndUpdate(roomId, {
          $inc: { totalRooms: quantity, bookedRooms: -quantity },
        });
      }

      // Xóa booking và payment tương ứng
      await Payment.findOneAndDelete({ orderId: booking._id });
      await HotelBooking.findByIdAndDelete(booking._id);
    }

    console.log(
      `Checked and cleaned up expired bookings at ${moment(now).format(
        "YYYY-MM-DD HH:mm:ss"
      )}`
    );
  } catch (error) {
    console.error("Error cleaning up expired bookings:", error);
  }
});
