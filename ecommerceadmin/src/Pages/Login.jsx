import React, { useContext, useState } from 'react'
import Input from '../Components/Input'
import {  useNavigate } from 'react-router-dom'
import EcomContext from '../Context/Ecomcontext'

const Login = ({
  isLogin=true
}) => {

  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const type = "Admin"

  const {authlogin,registerUser} = useContext(EcomContext)

  const handleSubmition = async()=>{
    try {

      if(!isLogin){
        if(!email|| !username || !password){
          alert("please fill all the fields")
        }else{
          try {
            const registered = await registerUser(username,email,password,type)
            alert(registered.msg)
            if(registered.msg === "Otp send on your email"){
              localStorage.setItem("userEmail",registered.email)
              navigate('/otpcheck')
            }
            else{
              navigate('/register')
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      }else{
        if(!email || !password){
          alert("please fill all the fields")
        }else{
          const loginUser = await authlogin(email,password);
          alert(loginUser.msg)
          if(loginUser.msg === "Otp send on your email"){
            localStorage.setItem("userEmail",loginUser.email)
            navigate('/otpcheck')
          }
          else{
            navigate('/register')
          }
        }
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }


  const navigate = useNavigate()
  return (
    <>
        <div className="bg-blue-900 w-screen h-screen flex items-center flex-col justify-center gap-2 ">
            {/* <div className='text-center w-full'>
                <button className='bg-white p-2 rounded-lg px-4'><i className="fa-brands fa-google mr-2"></i>Login With Google</button>
            </div> */}
            <div className="flex flex-col gap-3 items-center bg-slate-300 p-6 rounded-lg mx-auto ">
                <h1 className="text-2xl font-bold cursor-pointer">{isLogin?"LOGIN":"REGISTER"}</h1>
                {
                  !isLogin && 
                  <Input type={"text"} handleChange={(e)=>setUsername(e.target.value)} icon={"user"} placeholder={"Enter UserName"} id={"User"} />
                }
                <Input type={"email"} handleChange={(e)=>setEmail(e.target.value)} icon={"envelope"} placeholder={"Enter Email"} id={"Email"} />
                <Input type={"password"} handleChange={(e)=>setPassword(e.target.value)} icon={"lock"} placeholder={"Enter Password"} id={"Password"} />
                <div className='text-center w-full'>
                  <button onClick={handleSubmition} className='bg-white p-3 py-1 mt-4 md:hover:bg-blue-400 duration-500 hover:shadow-2xl shadow-black rounded-xl w-1/2 '>{isLogin?"Login":"Register"}</button>
                </div>
                <div className="">
                  <p>{isLogin?"Don't have account ":"Already Have Account"}<span className='text-blue-500 cursor-pointer' onClick={()=>navigate(isLogin?"/register":"/login")}>{isLogin?" Register":" Login"}</span></p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login