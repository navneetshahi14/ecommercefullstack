import React, { useContext, useEffect, useState } from 'react'
import EcomuserContext from '../Context/EcomuserContext'

const AddressForm = () => {

    const { setAddressform,updatingAddress,userdetails,viewdetails } = useContext(EcomuserContext)

    const [phone,setphone] = useState(userdetails.PhoneNo)
    const [fullAddress,setfullAddress] = useState(userdetails.address)
    const [postal,setpostal] = useState(userdetails.postal)
    const [city,setcity] = useState(userdetails.City)
    const [country,setCountry] = useState(userdetails.country)
    

    const clickfunc = () =>{
        
        updatingAddress(phone,fullAddress,postal,city,country)
    }

    useEffect(()=>{

        viewdetails()

    },[])

  return (
    <>
        <div className={`fixed bg-[#00000091] top-0 left-0 right-0 bottom-0 flex items-center justify-center  `}>
            <div className='h-auto w-auto max-w-[60%] p-2 bg-blue-300 rounded-lg animate-dropdown  '>

                <h1 className='font-bold text-2xl flex justify-between px-10 pt-5'>Update Address <i onClick={()=>setAddressform(false)} className='fa-solid fa-xmark cursor-pointer'></i></h1> 

                <div className="py-2 pt-5 px-5">

                    <label >Phone No.</label>
                    <input type="text" value={phone} onChange={(e)=>setphone(e.target.value)} placeholder='Enter your Phone No.' />

                    <label >Full Address</label>
                    <input type="text" value={fullAddress} onChange={(e)=>setfullAddress(e.target.value)} placeholder='Enter your Full Address' />

                    <label >Postal Code</label>
                    <input type="text" value={postal} onChange={(e)=>setpostal(e.target.value)} placeholder='Enter your postal code ' />

                    <label >City</label>
                    <input type="text" value={city} onChange={(e)=>setcity(e.target.value)} placeholder='Enter your City' />

                    <label >Country</label>
                    <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Enter your Country' />

                    <button onClick={()=>clickfunc()} className='btn-primary w-full mt-2'>Submit</button>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default AddressForm