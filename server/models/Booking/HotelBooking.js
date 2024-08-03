const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hotelbooking = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customers", required: true },
  booking_type: {
    type: String,
    enum: ["hotel"],
    required: true,
  },
  hotelID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Hotels",
  },
  payment_status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  rooms: [
    {
      roomId: {
        type: Schema.Types.ObjectId,
        ref: "RoomType",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  hold_until: { type: Date }, // thời gian hết hạn giữ phòng
  hold_status: {
    type: String,
    enum: ["on_hold", "released"],
    default: "released",
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  customer_note: {
    type: String,
  },
});

module.exports = mongoose.model("Hotelbookings", Hotelbooking);
