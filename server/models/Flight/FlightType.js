const mongoose = require("mongoose");
const Flight = require("./Flight");
const Schema = mongoose.Schema;

const FlightTypesSchema = new Schema({
  FlightTypes_id: {
    type: String,
    require: true,
  },
  FlightTypes_name: {
    type: String,
    require: true,
  },
  FlightTypes_availableSeats: {
    type: Number,
    require: true,
  },
  FlightTypes_prices: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("FlightTypes", FlightTypesSchema);
