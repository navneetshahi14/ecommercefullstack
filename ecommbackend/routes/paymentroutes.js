const express = require('express')
const payment = express.Router()
const Pc = require('../controller/paymentGateway')

payment.post('/createOrder',Pc.creatingOrder)

payment.post('/verifyPayment',Pc.verifyPayment)

module.exports = payment
