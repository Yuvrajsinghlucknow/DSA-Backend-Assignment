const express = require('express')

const app = express()

const userRouter = require('./routes/userRouter')

app.use(express.json({limit:'32kb'})) 

app.use('/api/dsa/users',userRouter)

module.exports = app