const JWT = require('jsonwebtoken')

const generateToken=(id)=>{
    try {
        return JWT.sign({id},process.env.JWT_Key,{
            expiresIn:"2d"
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    generateToken
}
