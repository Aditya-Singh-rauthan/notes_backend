const mongoose = require('mongoose')

const statusSchema = mongoose.Schema({
    name:{
        type:String
    }
})

const typeSchema = mongoose.Schema({
    name:{
        type:String
    }
})
module.exports = {
    StatusModel:mongoose.model('Status',statusSchema),
    TypeModel : mongoose.model('Type',typeSchema)
}