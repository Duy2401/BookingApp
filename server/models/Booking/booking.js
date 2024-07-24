const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BookingSchema = new Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true,
  },
  booking_Type: {
    type: String,
    required: true,
  },
  booking_customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },

  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  booking_service_id: {
    type: Schema.Types.ObjectId,
    ref: "Hotels",
    required: true,
  },
  quantityPeople: {
    adult: {
      type: Number,
      required: true,
    },
    child: {
      type: Number,
      required: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  booking_status: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("BookingSchema", BookingSchema);
