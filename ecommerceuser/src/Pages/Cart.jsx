import React, { useContext, useEffect, useState } from 'react'
import Headers from '../Components/Headers'
import EcomuserContext from '../Context/EcomuserContext'
import axios from 'axios'
import AddressForm from './AddressForm'

const Cart = () => {

    const {cartProduct,allproducts,allProduct,addtocart,removefromcart,setAddressform,addressform,userdetails,viewdetails,handlePayment } = useContext(EcomuserContext)
    const [prod,setProd] = useState([])
    const [lengthname,setlengthname] = useState(localStorage.getItem('name').length)


    useEffect(()=>{
        
        if(cartProduct.length >0){
            axios.post('/user/cartproduct',{ids:cartProduct}).then(response => {
                setProd(response.data)
            })
        }

    },[cartProduct])



    let total = 0;
    for(const productid of cartProduct){
        console.log(allproducts.find(p=>p._id === productid))
        
        const pricetoshow = parseInt(allproducts.find(p => p._id === productid)?.price || 0)
        total += pricetoshow

    }

    useEffect(()=>{
        allProduct()
        viewdetails()
    },[])

  

  return (
    <>
        <div className="">
            <Headers />
            <div className="max-w-[1200px] mx-auto my-0 px-[20px] py-0  ">
                <div className="flex gap-10 mt-10 h-auto">
                    <div className="bg-[#ffffff] rounded-xl p-8 h-auto min-w-[60%]">
                        <h2 className='text-3xl font-bold mb-7'>Cart</h2>
                        {
                            !cartProduct?.length && (
                                <div>Your cart is empty</div>
                            )
                        }

                        {
                        cartProduct?.length > 0 && (
                                <>
                                    <table className='basic'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prod.map(product => (
                                                <tr key={product._id}>
                                                    <td className='flex items-center gap-2'>
                                                        <div className='w-[100px] flex items-center justify-center h-[100px] p-2 border rounded-lg shadow-4xl'>
                                                            <img src={product.image[0]} alt="" className='max-w-[80%] '/>
                                                        </div>
                                                        {product.title}
                                                    </td>
                                                    <td>
                                                        <button onClick={()=>{removefromcart(product._id)}} className=' p-2 py-1 shadow-4xl text-sm text-[#aaa] border rounded-lg bg-[#f0f0f0]'><i className="fa-solid fa-minus" ></i></button>
                                                        <span className='px-2 py-0'>
                                                            {cartProduct.filter(id => id === product._id).length}
                                                        </span>
                                                        <button className='p-2 py-1 shadow-4xl text-sm text-[#aaa] border rounded-lg  bg-[#f0f0f0]' onClick={()=>addtocart(product._id)}><i className="fa-solid fa-plus"></i></button>
                                                    </td>
                                                    <td>
                                                        ₹{cartProduct.filter(id => id === product._id).length * product.price}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className='font-bold text-xl px-4'>Total</td>
                                                <td></td>
                                                <td>₹{total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                                )
                            }

                    </div>
                    {!!cartProduct.length && (
                        <div className="bg-[#fff] rounded-xl p-8 min-w-[40%] h-auto flex flex-col">
                            <h2 className="text-[2rem] font-bold">Order-Information</h2>
                            <div className='w-[100%]  ' >
                                <input type="text" placeholder='enter your name' value={localStorage.getItem("name").substring(1,lengthname-1)} readOnly />
                                <input type="text" placeholder='enter your phoneNo ' value={userdetails?.PhoneNo} readOnly />
                                <input type="text" placeholder='enter your address ' value={userdetails?.address} readOnly />
                                <input type="text" placeholder='enter your city ' value={userdetails?.City} readOnly />
                                <input type="text" placeholder='enter your country ' value={userdetails?.country} readOnly />
                                <input type="text" placeholder='enter your postal ' value={userdetails?.postal} readOnly /> 
                                <button className='bg-purple-600 p-2 px-4 rounded-sm shadow-md mt-4 text-white' onClick={()=>setAddressform(true)}>Edit Details</button>
                            </div>
                            <div className="my-2 py-2 ">
                                <button onClick={()=>handlePayment(localStorage.getItem('userId'),localStorage.getItem("name").substring(1,lengthname-1),total)} className='bg-gray-700 p-1 rounded text-gray-300 px-5'>Continue to Payment</button>                                                             
                                
                            </div>
                        </div>
                    )}
                    {
                        addressform &&
                        <AddressForm />
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart