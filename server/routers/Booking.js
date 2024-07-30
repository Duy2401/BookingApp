const BookingController = require("../controllers/bookingController");
const middlewareControlle = require("../controllers/middlewareController");

const router = require("express").Router();

// Hotel
router.post(
  "/createbookings",
  middlewareControlle.verifyToken,
  BookingController.createBooking
);
router.post(
  "/momo-notify",
  middlewareControlle.verifyToken,
  BookingController.handleMoMoNotify
);
// Tour

// Flight

module.exports = router;
