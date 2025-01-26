const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {  pickup, destination, vehicleType } = req.body
    console.log("id",req.user._id,req.user.id);

    try{
        const ride=await rideService.createRide({user:req.user._id, pickup, destination, vehicleType})
        console.log("rideee",ride);
        return res.status(200).json(ride)
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}