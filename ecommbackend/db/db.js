const mongoose = require('mongoose')
const MongooseUri = "mongodb://0.0.0.0:27017/ecomapp"

const mongooseConnect=()=>{
    mongoose.connect(MongooseUri)
    let db = mongoose.connection
    db.on('error',()=>console.log("Some Error in connecting database"))
    db.once('open',()=>console.log("Database connected"))
}

module.exports = mongooseConnect