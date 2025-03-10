const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const db = require('./db/db')
const bodyparser = require('body-parser')
const path = require('path')
const cors = require('cors')
db()

const allowedOrigins = ['https://ecommerceuser.onrender.com', 'https://ecommerceadmin-txez.onrender.com'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
      
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions))
app.options('*',cors(corsOptions))
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
