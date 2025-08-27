const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String },
  amount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "success", "failed"],
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
