const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
  customers_id: {},
});

module.exports = mongoose.model("Reviews", ReviewsSchema);
