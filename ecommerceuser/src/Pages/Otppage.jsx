// import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EcomuserContext from '../Context/EcomuserContext'

const Otppage = ({length=4}) => {


    // const {useremail,setUseremail,checkotp} = useContext(EcomContext)
    const {user,setUser} = useContext(EcomuserContext)
    const [otp,setOtp] = useState(new Array(length).fill(""))
    const [email,setEmail] = useState()
    const inputRef = useRef([])
    const [finalotp,setFinalotp] = useState()
    const navigate = useNavigate()


    useEffect(()=>{

        const userEmail = localStorage.getItem("email")
        setEmail(userEmail)
        if(inputRef.current[0]){
            inputRef.current[0].focus()
        }
    },[])

    const handleSubmit =async()=>{


        if(finalotp.toString().length != length || !email){
            alert("Please fill all the fields")
        }else{
            const res = await fetch('http://localhost:8000/auth/checkotp',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,otp:finalotp
                })
            })

            const resdata = await res.json()
            if(resdata.msg === "Login Successfull"){
                localStorage.removeItem('email')
                localStorage.setItem('user',JSON.stringify(resdata))
                localStorage.setItem('loggedIn',true)
                localStorage.setItem("userId",JSON.stringify(resdata.userId))
                localStorage.setItem("name",JSON.stringify(resdata.name))
                localStorage.setItem("PhoneNo",JSON.stringify(resdata.PhoneNo))
                localStorage.setItem("address",JSON.stringify(resdata.address))
                localStorage.setItem("Postal",JSON.stringify(resdata.postal))
                localStorage.setItem("City",JSON.stringify(resdata.City))
                localStorage.setItem("Country",JSON.stringify(resdata.Country))
                navigate('/')
            }else{
                navigate('/login')
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
            <div className="md:w-[40%] md:h-[40%] w-[80%] h-[50%]  bg-slate-300 flex flex-col items-center justify-center gap-4 rounded shadow-md">
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

export default Otppage