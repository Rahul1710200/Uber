const UserModel=require("../model/User")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userModel = require("../model/User")
const BlacklistedToken=require("../model/blacklistToken.model")

module.exports.authUser=async (req,res,next)=>{

    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'ggvfgUnauthorized'})
    }

    const isBlacklisted =await  BlacklistedToken.findOne({token:token})
    if(isBlacklisted){
         return res.status(401).json({message:'Unauthorized'})

    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log("dex",decoded);
        const user=await userModel.findById(decoded.id)
        console.log("usss",user);
        req.user=user
        return next()

    }
    catch(err){
               return res.status(401).json({message:'newwwUnauthorized'})

    }

}