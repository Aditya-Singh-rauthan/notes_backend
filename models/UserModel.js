const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Mandatory'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is Mandatory']
    },
    mobile:{
        type:String,
        maxLength:6
    },
    password:{
        type:String,
        required:[true,'Password is Mandatory']
    },
    enc_p:{
        type:String,
        required:[true,'Password is Mandatory']
    },
    // image:[{
    //     public_id:{
    //         type:String,
    //         required:true
    //     },
    //     url:{
    //         type:String,
    //         required:true
    //     }
    // }],
    // category:{
    //     type:String,
    //     required:[true,'Please Enter Product Category']
    // },
})

module.exports = mongoose.model("User",userSchema)