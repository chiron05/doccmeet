const {Router}=require('express');
const { signUp, verifyOtp }=require('../Controllers/userController')
const userRouter=Router();

userRouter.post('/signup',signUp)
userRouter.post('/signup/verify',verifyOtp)

module.exports=userRouter