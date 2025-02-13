const express=require('express')
const router=express.Router();
const {body}=require("express-validator")
const userController=require('../controllers/user.controller')

const authMiddleware=require("../middlewares/auth.middleware")

router.post('/register',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('fullName.firstName').isLength({min:3}).withMessage('firstname is atleast 3 charcters'),
        body('password').isLength({min:6}).withMessage('password is of atleast 6 charcters'),
    ],
    userController.registerUser
)
router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({min:6}).withMessage('password is of atleast 6 charcters'),
    ],
    userController.loginUser
)
router.get('/profile',
    authMiddleware.authUser,
    userController.getUserProfile
)
router.get('/logout',
    authMiddleware.authUser,
  
    userController.logoutUser
)

// router.post("/verify-otp", verifyOtp);
module.exports=router