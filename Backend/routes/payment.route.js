const express = require("express");
const router = express.Router();
const {
  createPayment,
  verifyPayment,
} = require("../controllers/Payment.controller");

router.post("/create-payment", createPayment);
router.post("/verify-payment", verifyPayment);
module.exports = router;
