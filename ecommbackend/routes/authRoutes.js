const express = require('express')
const AuthRoute = express.Router()
const Authcontroller = require('../controller/Authcontroller')

AuthRoute.post('/register',Authcontroller.register)

AuthRoute.post('/checkotp',Authcontroller.checkOtp)

AuthRoute.post('/login',Authcontroller.login)


module.exports = AuthRoute