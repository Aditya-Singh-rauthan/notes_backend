const mongoose = require('mongoose')

const db_uri = 'mongodb+srv://aditya12:%40d!+y%4012@cluster0.1zjsj.mongodb.net/notes-safe-online?retryWrites=true&w=majority'
const connectDatabase = () =>{
    // console.log(">>>>>>process.env",process.env)
    mongoose.connect(db_uri,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log('>>>>connected with mongo',data.connection.host)
    }).catch((err)=>{
        console.log('>>>error',err)
    })
}

module.exports = {connectDatabase}