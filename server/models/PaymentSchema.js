const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failure"],
    default: "pending",
  },
  createDate: { type: Date, default: Date.now },
  type: { type: String, enum: ["hotel", "flight", "tour"], required: true },
});
module.exports = mongoose.model("Payment", PaymentSchema);
