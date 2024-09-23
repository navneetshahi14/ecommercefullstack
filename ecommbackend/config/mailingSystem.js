const nodemailer = require('nodemailer')

const otpSend = async(email,name,randomotp) =>{
    try{

        const Transport = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASSWORD
            }
        })

        const mailoption = {
            from : process.env.USER,
            to :email,
            subject : "Otp for verifying your cerdentials",
            html: `<p> Hii, ${name} Otp is : ${randomotp} </p>`
        }

        Transport.sendMail(mailoption,function(error,info){
            if(error){
                console.log(error);
            }
            else{
                console.log("email has been send");
            }
        })

    }catch(err){
        console.log(err.message);
    }
}


module.exports = {
    otpSend
}