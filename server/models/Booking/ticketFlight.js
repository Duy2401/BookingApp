const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketFlightSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flights", // Reference to the Flight schema
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customers", // Reference to the Passenger schema
    required: true,
  },
  seat_number: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    enum: ["Economy", "Business", "First"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  booking_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["booked", "checked-in", "cancelled"],
    default: "booked",
  },
});
module.exports = mongoose.model("TicketFlights", TicketFlightSchema);
