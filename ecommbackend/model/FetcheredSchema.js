const mongoose = require('mongoose')

const FeaturedSchema = new mongoose.Schema({
    productid:{
        type:mongoose.Types.ObjectId,
        ref:"product"
    }
})


const featured = mongoose.model("featured",FeaturedSchema)

module.exports = featured