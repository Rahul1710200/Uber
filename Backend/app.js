const dotenv=require('dotenv')
dotenv.config()

const express=require('express');
const cors=require('cors')
const app= express();
const connectToDb = require('./db/db');
// const { connection } = require('mongoose');
const cookieParser=require('cookie-parser')
const userRoute=require("./routes/user.routes")
const captainRouter=require('./routes/captain.route')

connectToDb()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/user",userRoute);
app.use("/captain",captainRouter);

app.get('/',(req,res)=>{
    res.send("hello")
})



module.exports=app;