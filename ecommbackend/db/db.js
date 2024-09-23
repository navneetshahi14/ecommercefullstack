const mongoose = require('mongoose')

const MongooseUri = `mongodb+srv://navneetshahi2004:P1pSutPNiRngj468@cluster123.uy6np.mongodb.net/?retryWrites=true&w=majority&appName=Cluster123`

const mongooseConnect=()=>{
    mongoose.connect(MongooseUri,{ useNewUrlParser: true, useUnifiedTopology: true })
    let db = mongoose.connection
    db.on('error',()=>console.log("Some Error in connecting database"))
    db.once('open',()=>console.log("Database connected"))
}

module.exports = mongooseConnect