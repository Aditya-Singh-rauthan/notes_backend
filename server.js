const app = require('./app')
const {connectDatabase} = require('./config/Database')

connectDatabase()
//config

// dotenv.config({path:'config/.env'})
// console.log("evn..........",process.env)
// console.log(process.argv)


app.listen(process.env.PORT || 5001,()=>{
    console.log('Listening on ',process.env.PORT)
})