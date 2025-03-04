const user = require('../model/userschema')
const { otpSend } = require('../config/mailingSystem')
const { otpGenrator } = require('../config/otpgenerator')
const { generateToken } = require('../config/generateToken')
const {compare} = require('bcrypt')
const passwordHash = require('../config/passwordhashing')

const register = async(req,res) =>{
    try{

        const {name,email,password,type} = req.body

        if(!name || !email || !password || !type){
            res.status(400).json({msg:"Please fill all the fields"})
        }else{
            const findUser = await user.findOne({email:email})
            const passwordsetting = await passwordHash(password)
            const otp = otpGenrator()

            if(findUser){

                res.status(303).json({msg:"User  Exist with same credentials"})

            }else{

                const newUser = user({
                    name:name,
                    email:email,
                    password:passwordsetting,
                    otp:otp,
                    type:type
                })

                const Userregistered = await newUser.save()

                if(Userregistered){
                    otpSend(Userregistered.email,Userregistered.name,otp)
                    res.status(200).json({msg:"Otp send on your email",email:email})
                }else{
                    res.status(305).json({msg:"Something went wrong"})
                }

            }
        }
        


    }catch(err){
        console.log("ErrorMessage:-> "+err.message);
    }
}

const checkOtp = async(req,res) =>{
    try {
        
        const {email,otp} = req.body

        const userfind = await user.findOne({email:email})

        if(!email || !otp){
            console.log("please fill all the fields hg");
        }
        else{
            if(userfind){
                if(userfind.otp === otp){
                    res.status(200).json({msg:"Login Successfull",name:userfind.name,email:userfind.email,userId:userfind._id,token:generateToken(userfind._id),type:userfind.type})
                }
            }
        }

    } catch (error) {
        console.log(error.message)
    }
}

const login = async(req,res) =>{
    try{

        const {email,password} = req.body
        const otp = otpGenrator()

        if(!email || !password){
            res.status(400).json({msg:"Please fill all the fields"})
        }else{
            const userfind = await user.findOne({email:email})
            if(!userfind){
                res.status(400).json({msg:"User doesn't exist"})
            }
            else{
                const comparePass = await compare(password,userfind.password)
                if(comparePass){
                    const setotp = await user.findByIdAndUpdate({_id:userfind._id},{
                        $set:{
                            otp:otp
                        }
                    })

                    if(setotp){
                        await otpSend(userfind.email,userfind.name,otp)
                        res.status(200).json({msg:"Otp send on your email",email:email})
                    }
                    else{
                        res.status(300).json({msg:"Something went wrong"})
                    }
                }else{
                    res.status(300).json({msg:"Wrong credentials"})
                }
            }

        }

    }catch(err){
        console.log(err.message)
    }
}


module.exports = {
    register,
    checkOtp,
    login

}
