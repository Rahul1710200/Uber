const mapService = require("./maps.service");
const rideModel=require('../model/ride.model')
const gemini = require("../Gemini/gemini");
const crypto = require("crypto")

module.exports.createRide=async ({user,pickup,destination,vehicleType})=>{

  if(!user || !pickup || !destination || !vehicleType){
    throw new Error("All fields are required")
  }

  const fare= await getFare(pickup,destination);
  const otp=  getOtp(6);
  console.log("faree",fare);
  console.log(fare[vehicleType]);
  const ride=rideModel.create({
    user,
    pickup,
    destination,
    otp,
    fare:fare[vehicleType]
  })

  return ride;

}


const getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("pickup and destination are required");
  }
  const distanceTime = await mapService.getDistanceTimee(pickup, destination);

  console.log("distancetime,dustance",distanceTime.distance);
  console.log("distancetime,dusrtance",distanceTime.duration);

  const farePrompt = `You are part of a ride-hailing system that calculates the fare for trips. The fare depends not only on the distance (in kilometers) and duration (in minutes) of the trip but also on external factors such as traffic conditions, weather, and surge pricing. There are three types of vehicles: Motorbike, Auto, and Uber Go (Car).

Rules for Fare Calculation:

Base Pricing (static per vehicle type):

Motorbike: ₹20 base fare + ₹5 per km + ₹1 per minute.
Auto: ₹30 base fare + ₹8 per km + ₹1.5 per minute.
Uber Go (Car): ₹50 base fare + ₹12 per km + ₹2 per minute.
Dynamic Pricing Adjustments (contextual factors):

Traffic Congestion: Increase fare by 10% if traffic is moderate and 20% if traffic is heavy.
Weather: Add a flat ₹15 if it is raining or snowing.
Surge Pricing: Multiply the total fare by a surge multiplier (e.g., 1.5x during peak hours).
Output Format:
The system should calculate and return the adjusted fares for each vehicle type as a JSON object.

Input
{
  "distance": ${distanceTime.distance},
  "duration":${distanceTime.duration} ,
  "traffic": "",
  "weather": "",
  "surge_multiplier": 1.5
}

Output example 

{
  "moto": ,
  "auto": ,
  "car":
}

Always apply the dynamic adjustments (traffic, weather, surge) after calculating the base fare.
Ensure calculations are precise and return output as floating-point numbers rounded to 2 decimal places.
If no dynamic adjustments are provided in the input, assume default values:
 distance:null ,
  duration:null ,
traffic = "none"
weather = "clear"
surge_multiplier = 1.0

Remove any backtics and text formatting return only JSON object

`;

const fareResponse=await gemini.getgeminiresponse(farePrompt)
console.log("Type of fareResponse:", typeof fareResponse);
console.log("Value of fareResponse:", fareResponse);
  try {
    // Use regex to extract the JSON block
    const jsonMatch = fareResponse.match(/{[\s\S]*}/); // Matches text between { and }
    if (jsonMatch) {
      fare = JSON.parse(jsonMatch[0]); // Parse the extracted JSON
    } else {
      throw new Error("No JSON found in the response");
    }
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Invalid JSON response from Gemini");
  }
  return fare;
};

module.exports.getFare=getFare

const getOtp=(num)=>{
  const min = Math.pow(10, num - 1); 
  const max = Math.pow(10, num) - 1; 

  const otp = crypto.randomInt(min, max + 1);
  return otp.toString(); //
}

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};


module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};
module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await rideModel
    .findOne({
      _id: rideId,
      captain: captain._id,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};