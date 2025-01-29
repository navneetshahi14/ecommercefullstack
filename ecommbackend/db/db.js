const mongoose = require('mongoose')
const dotenv = require('dotenv')


const mongooseConnect=()=>{
    mongoose.connect(process.env.MONGOOSEURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    let db = mongoose.connection
    db.on('error',()=>console.log(`Some Error in connecting database ${process.env.MONGOOSEURI}`))
    db.once('open',()=>console.log("Database connected"))
}

module.exports = mongooseConnect