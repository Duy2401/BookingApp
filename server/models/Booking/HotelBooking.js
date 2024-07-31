const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hotelbooking = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customers", required: true },
  booking_type: {
    type: String,
    enum: ["hotel"],
    required: true,
  },
  booking_reference: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Hotels",
  },
  payment_status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "RoomTypeSchema",
    required: true,
  },
  hold_until: { type: Date }, // thời gian hết hạn giữ phòng
  hold_status: {
    type: String,
    enum: ["on_hold", "released"],
    default: "released",
  },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bookings", Hotelbooking);
