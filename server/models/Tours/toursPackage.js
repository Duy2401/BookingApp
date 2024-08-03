const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToursPackagesSchema = new Schema({
  tour_name: {
    type: String,
    required: true,
  },
  tour_address: {
    type: String,
    required: true,
  },
  tour_descriptive: {
    type: String,
    required: true,
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
    description_amenities: [{ type: String, required: true }],
    description_image: [{ type: String, required: true }],
    schedule: [
      {
        day: {
          type: String,
          required: true,
        },
        activities: [
          {
            activity_time: {
              type: String,
              required: true,
            },
            activity_description: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    available_slots: {
      type: Number,
      required: true,
    },
  },
  tour_types: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("ToursPackages", ToursPackagesSchema);
