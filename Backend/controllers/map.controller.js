const mapService = require('../services/maps.service')
const {validationResult} =require('express-validator')

module.exports.getCoordinates = async (req,res,next)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }
    const {address}=req.query

    try{
        const coordinates=await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates)
    }
    catch(err){
        res.status(500).json({message:'Internal server error'})
    }

}
module.exports.getDistanceTime = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { origin,destination } = req.query;
  

  try {
    const distanceTime = await mapService.getDistanceTimee(origin,destination);
    console.log("dusss",distanceTime.distance);
    res.status(200).json(distanceTime);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getAutoCompleteSuggestions=async(req,res)=>{
   const errors=validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const {input}=req.query;

  try{
  
    const suggestions=await mapService.getSuggestions(input)
    res.status(200).json(suggestions)

  }
catch(err){
          res.status(500).json({ message: "Internal server error" });


}

}