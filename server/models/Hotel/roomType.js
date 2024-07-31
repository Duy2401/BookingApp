const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomTypeSchema = new Schema({
  hotel_id: {
    type: Schema.Types.ObjectId,
    ref: "Hotels",
    require: true,
  },
  room_types: [
    {
      room_type_id: { type: String, required: true, unique: true },
      room_type: { type: String, required: true },
      price_range: { type: Number, required: true },
      isAvailable: { type: Boolean, default: false },
      availableRooms: { type: Number, default: 0 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware pre-save để kiểm tra tính duy nhất của room_type_id trong phạm vi hotel_id
RoomTypeSchema.pre("save", async function (next) {
  const roomType = this;
  if (roomType.isModified("room_types")) {
    for (const room of roomType.room_types) {
      const existingRoom = await RoomType.findOne({
        hotel_id: roomType.hotel_id,
        "room_types.room_type_id": room.room_type_id,
      });
      if (existingRoom) {
        const error = new Error(
          `Room type ID "${room.room_type_id}" already exists for this hotel.`
        );
        return next(error);
      }
    }
  }
  next();
});
module.exports = mongoose.model("RoomTypeSchema", RoomTypeSchema);
