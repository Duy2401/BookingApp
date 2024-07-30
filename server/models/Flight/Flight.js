const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FlightsSchema = new Schema({
  flightNumber: { type: String, required: true },
  airline: { type: String, required: true },
  departure: {
    airport: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  arrival: {
    airport: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  duration: { type: String, required: true },
  status: {
    type: String,
    enum: ["Scheduled", "Delayed", "Cancelled", "Departed", "Arrived"],
    default: "Scheduled",
  },
  aircraft: {
    model: { type: String, required: true },
    registration: { type: String, required: true },
    capacity: { type: Number, required: true },
  },
  fares: [
    {
      class: { type: String, required: true },
      price: { type: Number, required: true },
      currency: { type: String, required: true },
    },
  ],
});
module.exports = mongoose.model("Flights", FlightsSchema);
