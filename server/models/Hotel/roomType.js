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
      room_type: { type: String, required: true },
      price_range: { type: Number, required: true },
      isAvailable: { type: Boolean, default: false },
      availableRooms: { type: Number, default: 0 },
    },
  ],
});
RoomTypeSchema.pre("save", function (next) {
  this.isAvailable = this.room_types.some((room) => room.availableRooms > 0);
  next();
});

// Pre-update hook
RoomTypeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.room_types) {
    update.isAvailable = update.room_types.some(
      (room) => room.availableRooms > 0
    );
  }
  next();
});
module.exports = mongoose.model("RoomTypeSchema", RoomTypeSchema);
