const middlewareControlle = require("../controllers/middlewareController");
const bookingController = require("../controllers/Books/bookingHotelController");
const router = require("express").Router();

// Tạo đơn đặt phòng mới
router.post("/bookings", bookingController.createBooking);

// Lấy thông tin đơn đặt phòng
router.get("/bookings/:id", bookingController.getBooking);

// Cập nhật trạng thái thanh toán
router.patch(
  "/bookings/:id/payment-status",
  bookingController.updatePaymentStatus
);

// Xóa đơn đặt phòng
router.delete("/bookings/:id", bookingController.deleteBooking);

// Cập nhật trạng thái giữ phòng
router.patch("/bookings/:id/hold-status", bookingController.updateHoldStatus);

module.exports = router;
