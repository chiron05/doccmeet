const bcrypt=require('bcrypt');
const _ =require('lodash');
const axios=require('axios');
const otpGenerator=require('otp-generator');
const jwt=require('jsonwebtoken');
const { User } = require('../Model/userModel');
const Otp = require('../Model/otpModel')

const JwtToken=(num)=>{
    const token=jwt.sign({
        number:num
    },process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
    return token
}


module.exports.signUp=async(req,res)=>{
    const user=await User.findOne({
        number:req.body.number
    })
    if(user){
        return res.status(400).send("User Already registered")
    }
    const OTP=Math.floor(1000 + Math.random() * 9000)

    const number=req.body.number;
    console.log(OTP)

    const otp=new Otp({
        number:number,
        otp:OTP
    });
    await otp.save()

    return res.status(200).json({
        "OTP":OTP
    })
}

module.exports.verifyOtp=async(req,res)=>{
    const otpHolder=await Otp.find({
        number:req.body.number
    });
   
    if(otpHolder.length===0){
        return res.status(400).json({
            "message":"You used an Expired OTP"
        })
    }
    if(req.body.otp==otpHolder[0].otp){
        const token=JwtToken(req.body.number)
        const user=new User({
            number:req.body.number,
            token:token
        })
        return res.status(200).json(user)
    }
    else{
        return res.status(400).json({
            "message":"Invalid OTP"
        })
    }
}