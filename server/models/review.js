const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  booking_service_id: {
    type: Schema.Types.ObjectId,
    ref: ["Hotels", "ToursPackages"],
    require: true,
  },
  customers_id: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    require: true,
  },
  Rating: {
    type: Number,
    require: true,
  },
  Comment: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Reviews", ReviewsSchema);
