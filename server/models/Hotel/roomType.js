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
      room_id: { type: String },
      room_type: { type: String },
      price_range: { type: String },
      isAvailable: { type: Boolean, default: false }, // Boolean: có phòng trống hay không
      availableRooms: { type: Number, default: 0 }, // Number: số lượng phòng trống
    },
  ],
});
RoomTypeSchema.pre("save", function (next) {
  this.isAvailable = this.availableRooms > 0;
  next();
});

// Pre-update hook
RoomTypeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.availableRooms !== undefined) {
    update.isAvailable = update.availableRooms > 0;
  }
  next();
});
module.exports = mongoose.model("RoomTypeSchema", RoomTypeSchema);
