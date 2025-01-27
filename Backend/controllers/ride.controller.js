const rideService = require("../services/ride.service.js");
const { validationResult } = require("express-validator");
const mapService=require("../services/maps.service")
const {sendMessageToSocketId} =require('../socket');
const rideModel = require("../model/ride.model.js");


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {  pickup, destination, vehicleType } = req.body

    try{
        const ride=await rideService.createRide({user:req.user._id, pickup, destination, vehicleType})
        console.log("rideee",ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
        console.log(pickupCoordinates);
        const captainInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,20)
        console.log("capppinradisy",captainInRadius);

        ride.otp=''

        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')

        captainInRadius.map(captain=>{
            console.log("capt",captain,ride);
           sendMessageToSocketId(
             captain.socketId,
             {
               event: "new-ride",
               data: rideWithUser,
             }
           );
        })



        return res.status(200).json({ ride, captainInRadius });
    }
    catch(err){
        console.log("yha hai");
        return res.status(500).json({message:err.message})
    }
}
module.exports.getFare = async (req, res) => {
try{
const {pickup,destination}=req.body;
    const fare=await rideService.getFare(pickup,destination)
    return res.status(200).json(fare)
}catch(err){
  return res.status(500).json({ message: err.message });
}
   
}

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};