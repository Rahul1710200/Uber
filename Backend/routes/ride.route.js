const express = require('express')
const router=express.Router()
const rideController=require("../controllers/ride.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const {body} =require('express-validator')

router.post(
  "/create",
  authMiddleware.authUser,
 
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
    rideController.createRide


);

router.post('/getfare', authMiddleware.authUser,rideController.getFare)

module.exports = router