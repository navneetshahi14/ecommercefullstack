const jwt = require('jsonwebtoken')
const user = require('../model/userschema')
const JWT_Key = "Navneet.shahi@1938"
const AsyncHandler = require('express-async-handler')

const protect = AsyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,JWT_Key)
            req.user = await user.findById(decoded.id).select('-password')
            if(req.user && req.user.type === "Admin"){
                next()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    if(!token){
        res.status(401)
        console.log("Not Authorized , no Token Found")
    }
})


module.exports ={protect}