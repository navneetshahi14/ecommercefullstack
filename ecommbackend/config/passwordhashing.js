const bcrypt = require('bcrypt')

const passwordHash = async (password) =>{
    try {
        
        const hashingpass = await bcrypt.hash(password,10)
        return hashingpass

    } catch (error) {
        console.log(error.message);
    }
}

module.exports=passwordHash