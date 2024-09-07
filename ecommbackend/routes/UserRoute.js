const express = require('express')
const UserRoute = express.Router()
const {AllProducts,newProducts,cartProducts,getFeatured,addingaddress, viewdetails, productshowcase, findOrder, findproduct} = require('../controller/UserController')

UserRoute.get('/allProduct',AllProducts)

UserRoute.get('/newProduct',newProducts)

UserRoute.post("/cartproduct",cartProducts)

UserRoute.get('/getFeatured',getFeatured)

UserRoute.post('/addingaddress',addingaddress)

UserRoute.get('/viewsdetails/:userid',viewdetails)

UserRoute.get('/product/:productid',productshowcase)

UserRoute.get('/order/:userid',findOrder)

UserRoute.post('/productfind',findproduct)


module.exports = UserRoute
