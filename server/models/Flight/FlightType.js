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
  FlightTypes_desc: {
    desc_id: {
      type: String,
      default: null,
    },
    desc_title: {
      type: String,
      default: null,
    },
    desc_prices: {
      type: Number,
      default: null,
    },
    availableSeats: {
      type: Number,
      default: null,
    },
  },
});
module.exports = mongoose.model("FlightTypes", FlightTypesSchema);
