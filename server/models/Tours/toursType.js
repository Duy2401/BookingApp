const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TourTypesSchema = new Schema({
  TourTypes_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TourTypes", TourTypesSchema);
