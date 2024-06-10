const BookingController = require("../controllers/bookingController");
const router = require("express").Router();

// Hotel
router.post("/createbookinghotel", BookingController.CreateBookingHotel);
router.put("/editbookinghotel", BookingController.UpdateBookingHotel);

// Tour
router.post("/createbookingtour", BookingController.CreateBookingTour);
router.put("/editbookingtour", BookingController.UpdateBookingTour);

// Flight
router.post("/createticketflight", BookingController.CreateTicketFlight);
router.put("/editticketflight", BookingController.UpdateTicketFlight);

module.exports = router;
