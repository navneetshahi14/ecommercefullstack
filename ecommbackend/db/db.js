const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const mongooseUri = "mongodb://0.0.0.0:27017/ecommercebackend"
// const mongooseUri = 


const mongooseConnect=()=>{
    mongoose.connect(process.env.MONGOOSEURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    let db = mongoose.connection
    db.on('error',()=>console.log(`Some Error in connecting database ${process.env.MONGOOSEURI}`))
    db.once('open',()=>console.log("Database connected"))
}

module.exports = mongooseConnect