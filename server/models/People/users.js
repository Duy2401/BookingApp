const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  user_username: {
    type: String,
    require: true,
    minlength: 4,
    maxlength: 50,
    unique: true,
  },
  user_email: {
    type: String,
    require: true,
    minLength: 4,
    maxlength: 50,
    unique: true,
  },
  user_password: {
    type: String,
    require: true,
    minLength: 6,
  },
  user_name: {
    type: String,
    require: true,
  },
  user_gender: {
    type: String,
    require: true,
  },
  user_phone: {
    type: Number,
    require: true,
  },
  user_address: {
    type: String,
    require: true,
  },
  user_role: {
    type: Number,
    default: "01",
    require: true,
  },
  user_dateOfBirth: {
    type: Date,
    require: true,
  },
});
module.exports = mongoose.model("Users", UserSchema);
