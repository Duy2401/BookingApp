const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const HotelSchema = new Schema({
  hotel_id: {
    type: String,
    require: true,
  },
  hotel_name: {
    type: String,
    require: true,
  },
  hotel_address: {
    type: String,
    require: true,
  },
  hotel_descriptive: {
    type: String,
    require: true,
  },
  hotel_description: {
    description_note: [
      {
        note_title: {
          type: String,
          required: true,
        },
        note_content: {
          type: String,
          required: true,
        },
      },
    ],
    description_generalRuleS: [
      {
        rules_title: {
          type: String,
          required: true,
        },
        rules_content: {
          type: String,
          required: true,
        },
      },
    ],
    //amenities: tiện nghi
    description_amenities: [{ type: String, require: true }],
    description_image: [{ type: String, require: true }],
  },
  customers_id_create: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    require: true,
  },
  hotel_type: {
    type: Schema.Types.ObjectId,
    ref: "HotelTypes",
    require: true,
  },
});
module.exports = mongoose.model("Hotels", HotelSchema);
