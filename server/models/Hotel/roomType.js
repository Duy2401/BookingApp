const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomTypeSchema = new Schema({
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: "Hotels",
    require: true,
  },
  room_type: { type: String, required: true },
  price: { type: Number, required: true },
  totalRooms: { type: Number, default: 0 }, // tổng số phòng có
  bookedRooms: { type: Number, default: 0 }, // tổng số phòng đã được đặt
});

// Middleware pre-save to check the uniqueness of room_type within the scope of hotel_id
RoomTypeSchema.pre("save", async function (next) {
  const roomType = this;

  if (roomType.isModified("room_type")) {
    const existingRoomType = await mongoose.models.RoomType.findOne({
      hotel_id: roomType.hotel_id,
      room_type: roomType.room_type,
    });
    if (existingRoomType) {
      const error = new Error(
        `Room type "${roomType.room_type}" already exists for this hotel.`
      );
      return next(error);
    }
  }
  next();
});
module.exports = mongoose.model("RoomType", RoomTypeSchema);
