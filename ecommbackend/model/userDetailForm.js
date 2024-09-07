const mongoose = require('mongoose')

const userDetailFormSchema = new mongoose.Schema({
    userId:{
        type:String,
        default:""
    },
    PhoneNo:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    City:{
        type:String,
        default:""
    },
    country:{
        type:String,
        default:""
    },
    postal:{
        type:String,
        default:""
    }
})

const userDetailsForm = mongoose.model("userDetail",userDetailFormSchema)

module.exports = userDetailsForm