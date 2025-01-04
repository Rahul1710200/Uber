const {validationResult} =require('express-validator')
const captainModel = require('../model/captain.model')
const captainService =require('../services/captain.service')
const BlacklistedToken = require('../model/blacklistToken.model')

module.exports.registerCaptain=async(req,res,next)=>{

const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}

const {fullName,email,password,vehicle}=req.body
   const isCaptainAlready=await captainModel.findOne({email:email})

    if(isCaptainAlready){
        return res.status(400).json({message:'captain already registered'})
    }
  const hashedPassword=await captainModel.hashPassword(password)

    

    const user=await captainService.createCaptain({
        firstName:fullName.firstName,
        lastName:fullName.lastName,


        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    console.log(user);

    const token=user.generateAuthToken();

res.status(201).json({user,token})
}
module.exports.loginCaptain=async(req,res,next)=>{

const errors=validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}

const {email,password}=req.body

const captain=await captainModel.findOne({email}).select('+password')

   if(!captain){
        return res.status(401).json({message:"invalid email or password"})
    }
const isMatch=await captain.comparePassword(password)

if(!isMatch){
    return res.status(401).json({message:"invalid email or password"})

}
const token=captain.generateAuthToken();
res.cookie('token',token)

res.status(201).json({captain,token})
   

}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json( {captain:req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await BlacklistedToken.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}