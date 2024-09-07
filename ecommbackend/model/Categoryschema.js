const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    parent:{type:mongoose.Types.ObjectId, ref:"category"},
    properties:[{type:Object}]
})


const category = mongoose.model('category',categorySchema)

module.exports = category