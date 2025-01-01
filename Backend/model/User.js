const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const UserSchema=new mongoose.Schema({
    fullName:{
       firstName:{
        type:String,
        required:true,
        minlength:[3,"firstName is atleast of 3 charcters"]
       },
       lastName:{
        type:"String",
        minlength:[3,"LastName is atleast of 3 charcters"]
       }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,"Email is atleast of 5 charcters"]

    },
    password:{
        type:String,
        select:false,  // when we find user it will not go
        required:true
    },
    socketId:{
        type:String,
    }
    
})  

UserSchema.methods.generateAuthToken =  function(){
    const payload={id:this._id}
    const token=jwt.sign(payload,process.env.JWT_SECRET);
    return token;
}

UserSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password,this.password)
    
}

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)

};

const userModel=mongoose.model('user',UserSchema)
module.exports=userModel