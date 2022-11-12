const mongoose=require('mongoose')

const otpSchema=new mongoose.Schema({
    number:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{type:Date,default:Date.now,index:{expires:60}}
},{
    timestamps:true
})

module.exports= new mongoose.model('Otp',otpSchema);


