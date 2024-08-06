const middlewareControlle = require('../controllers/middlewareController');
const bookingController = require('../controllers/Books/bookingHotelController');
const router = require('express').Router();

// Tạo đơn đặt phòng mới
router.post(
  '/createbookings',
  middlewareControlle.verifyToken,
  bookingController.createBookingCash
);

// Lấy thông tin đơn đặt phòng
router.get(
  '/getbookingofcustomer/:id',
  middlewareControlle.verifyToken,
  bookingController.getBookingOfCustomer
);

router.get(
  '/getbookingofhotel/:id',
  middlewareControlle.verifyToken,
  bookingController.getBookingOfHotel
);

// Cập nhật trạng thái thanh toán
router.get('/updateBookings/:id', bookingController.updatePaymentStatus);

// Xóa đơn đặt phòng
router.delete('/bookings/:id', bookingController.deleteBooking);

// Cập nhật trạng thái giữ phòng
router.patch('/bookings/:id/hold-status', bookingController.updateHoldStatus);

module.exports = router;
