const express = require('express')
const app = express()
const db = require('./db/db')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const cors = require('cors')
const Port = 8000 || process.env.PORT

dotenv.config()
db()

app.use(cors({
    origin:"https://ecommerce-admin-smoky-phi.vercel.app",
    methods:["POST","GET"],
    credentials:true
},{
    origin:"https://ecommerce-full-stack-project.vercel.app",
    methods:["POST","GET"],
    credentials:true
}))
app.use(bodyparser.json())
app.use(express.json())


const Authroute = require('./routes/authRoutes')
app.use('/auth',Authroute)

const AdminRoute = require('./routes/AdminRoute')
app.use('/admin',AdminRoute)

const UserRouter = require('./routes/UserRoute')
app.use('/user',UserRouter)

const payment = require('./routes/paymentroutes')
app.use('/payment',payment)

app.use('/',(req,res)=>{res.send("server started")})


app.listen(8000,()=>console.log("Server Started"))