const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const captainSchema=new mongoose.Schema({
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
    },
    status:{
        type:String,
        enum:['active',"inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"color is atleast of 3 charcters"]
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,"plate is atleast of 3 charcters"]
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,"capacity must be of atleast 1"]
        },
        vehicleType:{
             type:String,
            required:true,
            enum:['car','moto','auto']

        }

       
    },
     location:{
            ltd:{
                type:Number
            },
            lng:{
                type:Number
            }
        },
    
})  

// captainSchema.index({ location: "2dsphere" }); 

captainSchema.methods.generateAuthToken = function() {
    const payload = { id: this._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword =  async function(password){
    return await bcrypt.compare(password,this.password)
    
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)

};


const captainModel=mongoose.model("captain",captainSchema)
module.exports=captainModel