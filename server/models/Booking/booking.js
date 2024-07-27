const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotels", // Reference to the Hotel schema
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customers", // Reference to the Customer schema
    required: true,
  },
  rooms: [
    {
      roomType: {
        type: Schema.Types.ObjectId,
        ref: "RoomTypeSchema", // Reference to the RoomType schema
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"], // Possible statuses for the booking
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookingSchema.post("save", async function (doc, next) {
  const RoomType = mongoose.model("RoomTypeSchema");

  for (const room of doc.rooms) {
    const updatedRoomType = await RoomType.findByIdAndUpdate(
      room.roomType,
      { $inc: { availableRooms: -room.quantity } },
      { new: true }
    );

    if (updatedRoomType.availableRooms <= 0) {
      await RoomType.findByIdAndUpdate(room.roomType, {
        isAvailable: false,
      });
    }
  }

  next();
});

module.exports = mongoose.model("Bookings", BookingSchema);
