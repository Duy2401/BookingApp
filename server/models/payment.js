const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  Payment_id: {
    type: String,
    require: true,
  },
  Payment_amount: {
    type: Number,
    require: true,
  },
  Payment_date: {
    type: String,
    require: true,
  },
  Payment_customer_id: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    require: true,
  },
});
module.exports = mongoose.model("Payment", PaymentSchema);
