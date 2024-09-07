const express = require('express')
const AdminRoute = express.Router()
const AdminController = require("../controller/AdminController")
const {protect} = require('../middleware/authMiddleware')

AdminRoute.post('/addproduct',protect,AdminController.addProduct)

AdminRoute.get("/allproduct",protect,AdminController.getAllproducts)

AdminRoute.post("/updateproduct",protect,AdminController.updateProduct)

AdminRoute.post("/deleteproduct",protect,AdminController.deletetionProduct)

AdminRoute.post("/categoryCreation",protect,AdminController.categoryCreation)

AdminRoute.get("/categoryshow",protect,AdminController.showCategory)

AdminRoute.post('/categoryUpdate',protect,AdminController.updateCategory)

AdminRoute.post('/categorydelete',protect,AdminController.deleteCategory)

AdminRoute.post('/setFeatured',protect,AdminController.setFeaturedProduct)

AdminRoute.get('/getFeatured',protect,AdminController.getFeatured)

AdminRoute.get('/Getorders',protect,AdminController.fetchingOrders)

AdminRoute.get('/alluser',protect,AdminController.allUsers)

AdminRoute.post('/updateorderstatus',protect,AdminController.updateorderstatus)

module.exports = AdminRoute