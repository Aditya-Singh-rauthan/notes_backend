const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter a Name for This Product'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please Enter a Description for This Product']
    },
    price:{
        type:Number,
        required:[true,'Please Enter a Price for this Product'],
        maxLength:6
    },
    rating:{
        type:Number,
        // required:[true,'Please Enter a Price for this Product'],
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,'Please Enter Product Category']
    },
    stock:{
        type:Number,
        required:[true,'Please Enter available stock']
    }
})

module.exports = mongoose.model("Product",productSchema)