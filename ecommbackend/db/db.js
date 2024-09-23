const mongoose = require('mongoose')
// const MongooseUri = "mongodb://0.0.0.0:27017/ecomapp"
// P1pSutPNiRngj468
// const MongooseUri = ``

const mongooseConnect=()=>{
    console.log(process.env.MONGOOSEURI)
    mongoose.connect(process.env.MONGOOSEURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    let db = mongoose.connection
    db.on('error',()=>console.log("Some Error in connecting database"))
    db.once('open',()=>console.log("Database connected"))
}

module.exports = mongooseConnect