const dotenv=require('dotenv')
dotenv.config()

const express=require('express');
const cors=require('cors')
const app= express();
const connectToDb = require('./db/db');
// const { connection } = require('mongoose');
const userRoute=require("./routes/user.routes")

connectToDb()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/user",userRoute);

app.get('/',(req,res)=>{
    res.send("hello")
})



module.exports=app;