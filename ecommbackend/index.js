const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const db = require('./db/db')
const bodyparser = require('body-parser')
const path = require('path')
const cors = require('cors')
db()

const allowedOrigins = ['https://ecommercefullstack-b4bp-ad770ivj3.vercel.app/', 'https://ecommercefullstack-kk8s.vercel.app'];

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
app.options('*',cors())
app.use(bodyparser.json())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,"build")))
// app.use(express.static(path.resolve(__dirname,"build2")))

const Authroute = require('./routes/authRoutes')
app.use('/auth',Authroute)

const AdminRoute = require('./routes/AdminRoute')
app.use('/admin',AdminRoute)

const UserRouter = require('./routes/UserRoute')
app.use('/user',UserRouter)

const payment = require('./routes/paymentroutes')
app.use('/payment',payment)


app.listen(process.env.PORT,()=>console.log(`Server Started ${process.env.PORT}`))