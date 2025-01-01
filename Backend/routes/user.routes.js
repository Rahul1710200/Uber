const express=require('express')
const router=express.Router();
const {body}=require("express-validator")
const userController=require('../controllers/user.controller')

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('fullName.firstName').isLength({min:3}).withMessage('firstname is atleast 3 charcters'),
        body('password').isLength({min:6}).withMessage('password is of atleast 6 charcters'),
    ],
    userController.registerUser
)



module.exports=router