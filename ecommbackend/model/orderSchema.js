const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'user'
    },
    orderId:{
        type:String
    },
    paymentId:{
        type:String
    },
    products:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"product"
    },
    status:{
        type:String
    },
    amount:{
        type:String
    },
    orderstatus:{
        type:String
    }
},{
    timestamps:true
})

const orders = mongoose.model('orders',OrderSchema)

module.exports = orders