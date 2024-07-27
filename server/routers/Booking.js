const BookingController = require("../controllers/bookingController");
const middlewareControlle = require("../controllers/middlewareController");

const router = require("express").Router();

// Hotel
router.post(
  "/create",
  middlewareControlle.verifyToken,
  BookingController.CreateBooking
);
// Tour

// Flight

module.exports = router;
