const BookingHotel = require("../models/Booking/bookingHotel");
const BookingTour = require("../models/Booking/bookingTour");
const TicketFlight = require("../models/Booking/ticketFlight");

const BookingController = {
  CreateBookingHotel: async (req, res) => {
    try {
      const newBookingHotel = new BookingHotel({
        Booking_id: req.body.Booking_id,
        Booking_Type: req.body.Booking_Type,
        Booking_customer_id: req.body.Booking_customer_id,
        Booking_date: {
          check_in: req.body.check_in,
          check_out: req.body.check_out,
        },
        Booking_hotel_id: req.body.Booking_hotel_id,
        QuantityPeople: {
          adult: req.body.adult,
          child: req.body.child,
          AgeChild: req.body.AgeChild,
        },
        PaymentMethod: req.body.PaymentMethod,
        Booking_status: req.bodyBooking_status,
      });
      const bookinghotel = await newBookingHotel.save();
      return res.status(200).json(bookinghotel);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  UpdateBookingHotel: async (req, res) => {
    try {
      const editBookingHotel = await BookingHotel.findById(req.params.id);
      await editBookingHotel.updateOne({ $set: req.body });
      return res.status(200).json("Update Booking Hotel Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  CreateBookingTour: async (req, res) => {
    try {
      const newBookingTour = new BookingTour({
        Booking_id: req.body.Booking_id,
        Booking_Type: req.body.Booking_Type,
        Booking_customer_id: req.body.Booking_customer_id,
        Booking_date: {
          check_in: req.body.check_in,
          check_out: req.body.check_out,
        },
        Booking_tour_id: req.body.Booking_tour_id,
        QuantityPeople: {
          adult: req.body.adult,
          child: req.body.child,
          AgeChild: req.body.AgeChild,
        },
        PaymentMethod: req.body.PaymentMethod,
        Booking_status: req.body.Booking_status,
      });
      const bookingtour = await newBookingTour.save();
      return res.status(200).json(bookingtour);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  UpdateBookingTour: async (req, res) => {
    try {
      const editBookingTour = await BookingTour.findById(req.params.id);
      await editBookingTour.updateOne({ $set: req.body });
      return res.status(200).json("Update Booking Tour Successfully");
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
