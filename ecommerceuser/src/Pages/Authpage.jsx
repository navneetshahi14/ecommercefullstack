import axios from 'axios'
import React, { useState } from 'react'
import {   useNavigate } from 'react-router-dom'

const Authpage = ({isRegistered=false}) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const API = 'https://ecommercefullstack-1-6w1z.onrender.com'

    const navigate = useNavigate()

    const handlesubmition = async ()=>{
        
        if(isRegistered=== true){
            if(!name || !email || !password){
                alert("Please fill all the fields")
            }else{
                
                const res = await fetch('http://localhost:8000/auth/register',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name:name,
                        email:email,
                        password:password,
                        type:"User"
                    })
                })

                const resdata = await res.json()
                
                console.log(resdata)

                if(resdata.msg === "Otp send on your email"){
                    localStorage.setItem('email',resdata.email)
                    navigate('/otpcheck')                
                }else{
                    navigate('/register')
                }

            }
        }else{
            if(!password || !email){
                alert("login")
                alert("Please fill all the fields")
            }else{
                const res  = await fetch('http://localhost:8000/auth/login',{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({email:email,password:password})
                })

                const resdata = await res.json()

                console.log(resdata)

                if(resdata.msg === "Otp send on your email"){
                    localStorage.setItem('email',resdata.email)
                    navigate('/otpcheck')                
                }else{
                    navigate('/login')
                }
            }
        }
    }

  return (
    <>
        <div className="h-screen w-full bg-gray-300 flex justify-center items-center">
            <div className="md:max-w-[60%] max-w-[90%] h-auto p-10 rounded px-4 bg-white flex flex-col justify-center items-center shadow-4xl ">
                <h1 className="text-center uppercase text-2xl font-bold mb-5" >{(isRegistered)?"Register":"Login"}</h1>
                <div className='md:max-w-[60%] max-w-[90%] '>
                    {
                        isRegistered &&
                        <input className='' type="text" placeholder='Username' value={name} onChange={ev => setName(ev.target.value)} />
                    }
                    <input className='' type="text" placeholder='Email' value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input className='' type="text" placeholder='Password' value={password} onChange={ev => setPassword(ev.target.value)} />

                    <button className='w-full bg-gray-800 text-gray-200 py-2 rounded-lg mt-3' onClick={()=>handlesubmition()}>Submit</button>
                </div>
                <p className='mt-10'>{isRegistered?"Already Have Account":"Don't Have a Account"} <span className='cursor-pointer text-blue-800 font-bold ' onClick={()=> navigate(isRegistered ?'/login' :'/register')}>{isRegistered?"Login":"Register"}</span> </p>
            </div>

        </div>
    </>
  )
}

export default Authpage
