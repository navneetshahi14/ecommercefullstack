const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const db = require('./db/db')
const bodyparser = require('body-parser')
const path = require('path')
const cors = require('cors')
db()


app.use(cors())
app.use(bodyparser.json())

const Authroute = require('./routes/authRoutes')
app.use('/auth',Authroute)

const AdminRoute = require('./routes/AdminRoute')
app.use('/admin',AdminRoute)

const UserRouter = require('./routes/UserRoute')
app.use('/user',UserRouter)

const payment = require('./routes/paymentroutes')
app.use('/payment',payment)

app.get('/',(req,res)=>{
  res.send("hello world")
})

app.listen(process.env.PORT,()=>console.log(`Server Started ${process.env.PORT}`))