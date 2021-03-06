require('dotenv').config("/config/.env")
const mongoose = require('mongoose')
const db_uri = process.env.DB_URI
const connectDatabase = () =>{
    // console.log(">>>>>>process.env",process.env)
    mongoose.connect(db_uri,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log('>>>>connected with mongo',data.connection.host)
    }).catch((err)=>{
        console.log('>>>error',err)
    })
}

module.exports = {connectDatabase}