const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    otp:{
        type:String,
        required:[true,'OTP is Mandatory'],
        unique:[true,'OTP already generated'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is Mandatory'],
        unique:true
    },
    name:{
        type:String,
        required:[true,'name is Mandatory']
    },
    password:{
        type:String,
        required:[true,'password is Mandatory']
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 180
    }
})

module.exports = mongoose.model("Otp",otpSchema)