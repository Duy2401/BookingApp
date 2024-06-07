const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelTypeSchema = new Schema({
  HotelTypes_id: {
    type: String,
    require: true,
  },
  HotelTypes_name: {
    type: String,
    require: true,
  },
  HotelTypes_desc: [
    {
      desc_id: {
        type: String,
        default: null,
      },
      desc_title: {
        type: String,
        default: null,
      },
      desc_prices: {
        type: Number,
        default: null,
      },
      availableRooms: {
        type: Number,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model("HotelTypes", HotelTypeSchema);
