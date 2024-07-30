const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failure"], // Enum values for better clarity
    default: "pending",
    required: true,
  }, // 0: chưa thanh toán, 1: thành công, 2: thất bại
  createDate: { type: Date, default: Date.now },
  type: { type: String, enum: ["hotel", "flight", "tour"], required: true }, // Loại giao dịch
});
module.exports = mongoose.model("Payment", PaymentSchema);
