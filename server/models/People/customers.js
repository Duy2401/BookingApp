const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomersSchema = new Schema({
  customer_name: {
    type: String,
    require: true,
  },
  customer_gender: {
    type: String,
    require: true,
  },
  customer_phone: {
    type: Number,
    require: true,
  },
  customer_address: {
    type: String,
    require: true,
  },
  customer_email: {
    type: String,
    require: true,
    minLength: 4,
    maxlength: 50,
    unique: true,
  },
  customer_password: {
    type: String,
    require: true,
    minLength: 6,
  },
  customer_role: {
    type: Number,
    default: "01",
    require: true,
  },
  customer_dateOfBirth: {
    type: Date,
    require: true,
  },
});
module.exports = mongoose.model("Customers", CustomersSchema);
