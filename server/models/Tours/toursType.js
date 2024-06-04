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
  TourTypes_price: {
    type: Number,
    require: true,
  },
  TourTypes_availableSeats: {
    type: Number,
    require: true,
  },
  TourTypes_description: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("TourTypes", TourTypesSchema);
