const mongoose = require("mongoose");
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
  FlightTypes_price: {
    type: Number,
    require: true,
  },
  FlightTypes_availableRooms: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("FlightTypes", FlightTypesSchema);
