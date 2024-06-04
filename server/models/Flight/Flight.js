const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FlightsSchema = new Schema({
  Flight_id: {
    type: String,
    require: true,
    unique: true,
  },
  Flight_infor: {
    airline_id: {
      type: String,
      require: true,
    },
    airline_name: {
      type: String,
      require: true,
    },
  },
  Flight_duration: {
    type: Number,
    require: true,
  },
  Flight_DepartureTime: {
    DepartureTime_at: {
      type: Number,
      require: true,
    },
    DepartureTime_in: {
      type: Number,
      require: true,
    },
  },
  Flight_carbin: {
    type: Schema.Types.ObjectId,
    ref: "FlightTypes",
    require: true,
  },
  Flight_status: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("Flights", FlightsSchema);
