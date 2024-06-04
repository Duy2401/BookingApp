const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelTypeSchema = new Schema({
  HotelTypes_id: {
    type: Number,
    require: true,
  },
  HotelTypes_name: {
    type: String,
    require: true,
  },
  HotelTypes_price: {
    type: Number,
    require: true,
  },
  HotelTypes_availableRooms: {
    type: Number,
    require: true,
  },
  HotelTypes_description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("HotelTypes", HotelTypeSchema);
