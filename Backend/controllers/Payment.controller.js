const Razorpay = require("razorpay");
const Payment=require('../model/Payment.model')
const crypto = require("crypto");




const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
exports.createPayment = async(req, res) => {
  const { amount, currency } = req.body;


  console.log("amount",amount,currency);



  if (!amount || !currency) {
    return res.status(404).json("amount and currency both are required");
  }

  // 🔹 Initialize Razorpay

  try {
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      orderId: order.id,
      paymentId: "",
      amount,
      status: "pending",
    });
    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }

};



exports.verifyPayment=async (req,res)=>{
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

      // Step 2: Compare the generated signature with the received signature
      if (generatedSignature !== razorpay_signature) {
        return res
          .status(400)
          .json({ success: false, message: "Payment verification failed" });
      }

      const paymentRecord = await Payment.findOne({
        orderId: razorpay_order_id,
      });
      if (!paymentRecord) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid order ID" });
      }

      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          status: "success",
        },
        { new: true }
      );

          return res
            .status(200)
            .json({ success: true, message: "Payment verified successfully" });

    } catch (error) {
      console.error("Error verifying payment:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
}




