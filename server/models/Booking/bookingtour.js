const BookingTourSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "ToursPackages",
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  booking_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
  total_price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BookingsTours", BookingTourSchema);
