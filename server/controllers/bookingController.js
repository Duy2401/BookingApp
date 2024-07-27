const Booking = require("../models/Booking/booking");
const TicketFlight = require("../models/Booking/ticketFlight");

const BookingController = {
  CreateBooking: async (req, res) => {
    try {
      const { hotel, customer, checkInDate, checkOutDate, totalPrice, status } =
        req.body;
      const rooms = JSON.parse(req.body.rooms); // If rooms is a JSON string in form-data

      // Create a new booking
      const newBooking = new Booking({
        hotel,
        customer,
        rooms,
        checkInDate,
        checkOutDate,
        totalPrice,
        status,
      });

      // Save booking
      const booking = await newBooking.save();
      return res.status(200).json({
        status: true,
        message: "Booking Success",
        data: booking,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error,
      });
    }
  },
  UpdateBooking: async (req, res) => {
    try {
      const editBookingHotel = await BookingHotel.findById(req.params.id);
      await editBookingHotel.updateOne({ $set: req.body });
      return res.status(200).json("Update Booking Hotel Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate("Booking_service_id")
        .populate("Booking_customer_id");
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllBooking: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("Booking_service_id")
        .populate("Booking_customer_id");
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  CreateTicketFlight: async (req, res) => {
    try {
      const newTicketFlight = new TicketFlight({
        TicketFlight_id: req.body.TicketFlight_id,
        TicketFlight_customer_id: req.body.TicketFlight_customer_id,
        TicketFlight_date: req.body.TicketFlight_date,
        QuantityPeople: {
          adult: req.body.adult,
          child: req.body.child,
          AgeChild: req.body.AgeChild,
        },
        PaymentMethod: req.body.PaymentMethod,
        TicketFlight_status: req.body.TicketFlight_status,
      });
      const ticketflight = await newTicketFlight.save();
      return res.status(200).json(ticketflight);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  UpdateTicketFlight: async (req, res) => {
    try {
      const editTicketFlight = await TicketFlight.findById(req.params.id);
      await editTicketFlight.updateOne({ $set: req.body });
      return res.status(200).json("Update Booking Tour Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = BookingController;
