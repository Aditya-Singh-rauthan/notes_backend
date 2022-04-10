const app = require('./app')
const {connectDatabase} = require('./config/Database')

connectDatabase()
//config

// dotenv.config({path:'config/.env'})
// console.log("evn..........",process.env)
// console.log(process.argv)
app.get('/',(req,res)=>{
    return res.send('Running!!!')
})

app.listen(process.env.PORT,()=>{
    console.log('Listening on ',process.env.PORT)
})