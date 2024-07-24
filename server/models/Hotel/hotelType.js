const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelTypeSchema = new Schema({
  // Loại hình khách sạn (ví dụ: 5 sao, resort, hostel, v.v.).
  HotelTypes_id: {
    type: String,
    require: true,
  },
  HotelTypes_name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("HotelTypes", HotelTypeSchema);
