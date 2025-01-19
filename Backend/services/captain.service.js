const captainModel=require('../model/captain.model')

module.exports.createCaptain=({firstName,lastName,email,password,color,plate,capacity,vehicleType})=>{

    if(!firstName || !lastName || !email || !password || !color|| !plate || !capacity || !vehicleType){
        throw new Error("All fields are required")
    }
    const user=captainModel.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password,
        vehicle :{
            color,
            plate,
            capacity,
            vehicleType
        }

    })

    return user;

}