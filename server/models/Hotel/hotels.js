const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
  hotel_name: {
    type: String,
    required: true,
  },
  hotel_address: {
    type: String,
    required: true,
  },
  hotel_descriptive: {
    type: String,
    required: true,
  },
  hotel_description: {
    description_note: [
      {
        note_title: {
          type: String,
          requiredd: true,
        },
        note_content: {
          type: String,
          requiredd: true,
        },
      },
    ],
    description_generalRules: [
      {
        rules_title: {
          type: String,
          requiredd: true,
        },
        rules_content: {
          type: String,
          requiredd: true,
        },
      },
    ],
    //amenities: tiện nghi
    description_amenities: [{ type: String, required: true }],
    description_images: [
      {
        name_image: { type: String, required: true },
      },
    ],
  },
  customers_id_create: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  hotel_type: {
    type: Schema.Types.ObjectId,
    ref: "HotelTypes",
    required: true,
  },
  RoomType: {
    type: Schema.Types.ObjectId,
    ref: "RoomTypeSchema",
  },
  hotel_price: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Hotels", HotelSchema);
