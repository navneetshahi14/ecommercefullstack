const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:[String],
        default:""
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category"
    },
    property:{type:Object}
},
{
    timestamps:true
})

const product = mongoose.model('product',ProductSchema)

module.exports = product