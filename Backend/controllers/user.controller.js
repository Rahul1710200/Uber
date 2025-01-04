const userModel=require('../model/User')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')
const blacklistedToken=require("../model/blacklistToken.model")

module.exports.registerUser = async (req,res,next)=>{
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullName,email,password}=req.body;
    const isUserAlready=await userModel.findOne({email:email})

    if(isUserAlready){
        return res.status(400).json({message:'user already registered'})
    }

    const hashedPassword=await userModel.hashPassword(password)

    

    const user=await userService.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,

        email,
        password:hashedPassword
    })
    console.log(user);

    const token=user.generateAuthToken();

res.status(201).json({user,token})






    

}
module.exports.loginUser = async (req,res,next)=>{
    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({message:"invalid email or password"})
    }
const isMatch=await user.comparePassword(password)

if(!isMatch){
    return res.status(401).json({message:"invalid email or password"})

}
const token=user.generateAuthToken();
res.cookie('token',token)

res.status(201).json({user,token})






    

}

module.exports.getUserProfile=async (req,res)=>{
    res.status(200).json(req.user)

}
module.exports.logoutUser=async (req,res)=>{
    try {
        // Retrieve the token before clearing it
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        // Add the token to the blacklist
        await blacklistedToken.create({ token });

        // Clear the token cookie
        res.clearCookie('token');

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during logout" });
    }
    


}