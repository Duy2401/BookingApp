const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
  Booking_id: {
    type: String,
    require: true,
    unique: true,
  },
  Booking_Type: {
    type: String,
    require: true,
  },
  Booking_customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    require: true,
  },
  Booking_date: {
    check_in: {
      type: Date,
      require: true,
    },
    check_out: {
      type: Date,
      require: true,
    },
  },
  Booking_service_id: {
    type: Schema.Types.ObjectId,
    ref: ["Hotels", "ToursPackages"],
    require: true,
  },
  QuantityPeople: {
    adult: {
      type: Number,
      require: true,
    },
    child: {
      type: Number,
      require: true,
    },
    AgeChild: {
      type: Number,
      require: true,
    },
  },
  PaymentMethod: {
    type: String,
    require: true,
  },
  Booking_status: {
    type: Number,
    require: true,
  },
});
module.exports = mongoose.model("BookingSchema", BookingSchema);
