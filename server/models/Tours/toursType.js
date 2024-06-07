const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TourTypesSchema = new Schema({
  TourTypes_id: {
    type: Number,
    require: true,
  },
  TourTypes_name: {
    type: String,
    require: true,
  },
  TourTypes_desc: [
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
      availableSeats: {
        type: Number,
        default: null,
      },
    },
  ],
});

module.exports = mongoose.model("TourTypes", TourTypesSchema);
