const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TourBooking = new Schema({
  tour_package: {
    type: Schema.Types.ObjectId,
    ref: "ToursPackages",
    required: true,
  },
  tour_date: { type: Date, required: true },
  participants: { type: Number, required: true },
  total_price: { type: Number, required: true },
});

module.exports = mongoose.model("TourBooking", TourBooking);
