const { default: mongoose } = require('mongoose')
const app = require('./app')

const dotenv = require('dotenv')
dotenv.config({path:`${__dirname}/config.env`})

const DB = process.env.LOCAL_DATABASE

mongoose.connect(DB,{
    useNewUrlParser:true
})
.then(con=>{
    console.log("Database Connected Successfully... 😎👍")
})
.catch(err=>{
    console.log("Some error occured... 🔥🔥🔥", err)
})

const port = process.env.port || 9999

app.listen(port,()=>{
    console.log("Server Started Successfully... 🥳🔥")
})