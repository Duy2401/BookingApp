const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketFlight = new Schema({
  flight: {
    type: Schema.Types.ObjectId,
    ref: "Flights",
    required: true,
  },
  departure_date: { type: Date, required: true },
  return_date: { type: Date },
  passengers: { type: Number, required: true },
  class: { type: String, required: true },
  total_price: { type: Number, required: true },
});

module.exports = mongoose.model("FlightBooking", ticketFlight);
