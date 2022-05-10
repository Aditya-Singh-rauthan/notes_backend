const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is Mandatory'],
    },
    type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Type',
        required:[true,'Type is Mandatory']
    },
    content:{
        type:String,
        required:[true,'Content is Mandatory']
    },
    progressStatus:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Status'
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdOn:{
        type:Date,
        default:Date.now()
    }
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

module.exports = mongoose.model("Notes",notesSchema)