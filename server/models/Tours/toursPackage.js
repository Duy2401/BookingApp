const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToursPackagesSchema = new Schema({
  tour_id: {
    type: String,
    require: true,
  },
  tour_name: {
    type: String,
    require: true,
  },
  tour_address: {
    type: String,
    require: true,
  },
  // Miêu tả
  tour_descriptive: {
    type: String,
    require: true,
  },
  tour_description: {
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
    description_noteMore: [
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
  Tour_Type: {
    type: Schema.Types.ObjectId,
    ref: "TourTypes",
    require: true,
  },
});
module.exports = mongoose.model("ToursPackages", ToursPackagesSchema);
