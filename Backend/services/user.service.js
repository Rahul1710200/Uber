const userModel=require('../model/User')


module.exports.createUser = async function({firstName, lastName, email, password}){

    if( !firstName || !email || !password ){
        throw new Error("all fields ar reuired")
    }

    const user =userModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password
    })

    return user;

}