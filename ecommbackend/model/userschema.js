const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        default:""
    },
    phoneNo:{
        type:Number,
        default:""
    },
    address:{
        type:Array,
        default:""
    },
    postal:{
        type:String,
        default:""
    },
    City:{
        type:String,
        default:""
    },
    Country:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:"User"
    }
})

const user = mongoose.model("user",UserSchema)

module.exports = user