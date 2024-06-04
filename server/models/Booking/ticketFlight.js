const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketFlightSchema = new Schema({
  TicketFlight_id: {
    type: String,
    require: true,
    unique: true,
  },
  TicketFlight_customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    require: true,
  },
  TicketFlight_date: {
    type: Date,
    require: true,
  },
  TicketFlight_status: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("icketFlights", TicketFlightSchema);
