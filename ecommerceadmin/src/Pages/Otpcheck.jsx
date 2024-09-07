import React, { useContext, useEffect, useRef, useState } from 'react'
import EcomContext from '../Context/Ecomcontext'
import { useNavigate } from 'react-router-dom'

const Otpcheck = ({
    length=4
}) => {

    const {useremail,setUseremail,checkotp} = useContext(EcomContext)
    const [otp,setOtp] = useState(new Array(length).fill(""))
    const inputRef = useRef([])
    const [finalotp,setFinalotp] = useState()
    const navigate = useNavigate()


    useEffect(()=>{

        const userEmail = localStorage.getItem("userEmail")
        setUseremail(userEmail)
        if(inputRef.current[0]){
            inputRef.current[0].focus()
        }
    },[])

    const handleSubmit =async()=>{

        
        if(finalotp.toString().length != length){
            alert("Please fill Otp of "+length+" digits")
        }else{
            const checking = await checkotp(finalotp,useremail)
                alert(checking.msg)
                if(checking.msg === "Login Successfull"){
                    localStorage.removeItem("userEmail")
                    localStorage.setItem('user',JSON.stringify({name:checking.name,email:checking.email,token:checking.token,type:checking.type}))
                    localStorage.setItem("isLoggedIn",true)
                    navigate('/')
                }
                else{
                    alert("something went wrong")
                    navigate('/otpcheck')
                }
            }           
        }
        

    const handleChange = (index,e)=>{
        const value = e.target.value
        if(isNaN(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length-1)
        setOtp(newOtp)

        const combinedOtp = newOtp.join("")
        if(combinedOtp.length === length){
            setFinalotp(parseInt(combinedOtp))
        }

        if(value && index<length-1 && inputRef.current[index+1]){
            inputRef.current[index+1].focus()
        }
    }

    const handleClick =(index)=>{
        inputRef.current[index].setSelectionRange(1,1)

        if(index>0 && !otp[index-1]){
            inputRef.current[otp.indexOf("")].focus()
        }
    }

    const handlekeyDown =(index,e)=>{
        if(e.key === "Backspace" && !otp[index] && index>0 && inputRef.current[index -1]){
            inputRef.current[index-1].focus()
        }
    }


  return (
    <>
        <div className="bg-blue-900 h-screen w-full flex flex-col items-center justify-center">
            <div className="w-[40%] h-[40%] bg-slate-300 flex flex-col items-center justify-center gap-4 rounded shadow-md">
                <p className="text-3xl font-bold " >OTP</p>
                <div className="shadow-md w-[70%] text-center py-2">
                    {
                        otp.map((value,index)=>{
                            return(
                                <input key={index} type="text" ref={(input)=>(inputRef.current[index]=input)} value={value} onChange={(e)=>handleChange(index,e)} onClick={()=>handleClick(index)} onKeyDown={(e)=>handlekeyDown(index,e)} className={`w-[40px] h-[40px] m-[5px] p-1 text-center text-[1.2rem] shadow-md`} />
                            )
                        })
                    }
                </div>
                <button onClick={handleSubmit} className="bg-blue-400 p-2 px-4 mt-3 font-bold rounded shadow-md">Submit</button>
            </div>
        </div>
    </>
  )
}

export default Otpcheck