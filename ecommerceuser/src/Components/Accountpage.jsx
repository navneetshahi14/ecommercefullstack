import React, { useContext, useEffect, useState } from 'react'
import Headers from './Headers'
import EcomuserContext from '../Context/EcomuserContext'
import DetailedOrder from './DetailedOrder'

const Accountpage = () => {

    const [userdet,setUserdet] = useState(JSON.parse(localStorage.getItem('user')))
    const [listProduct,setListproduct] = useState([])
    const {viewdetails,userdetails,orderfound,findorders,orderdetail,setOrderdetail,findproduct} = useContext(EcomuserContext)

    useEffect(()=>{

        
        viewdetails()
        findorders()
        
    },[])

  return (
    <>
        <div className="">
            <Headers />
            <div className="p-2">
                <h1 className='text-xl underline mb-2 font-bold'>User Details</h1>
                <p><span className='font-bold'>Name</span>: {userdet?.name}</p>
                <p><span className='font-bold'>Email</span>: {userdet?.email}</p><br />
                <h1 className="text-xl underline mb-2 font-bold">Contact details And Address</h1>
                <p><span className='font-bold'>Phone No.</span>: {userdetails?.PhoneNo}</p>
                <p><span className='font-bold'>Address</span>: {userdetails.address}</p>
                <p><span className='font-bold'>City</span>: {userdetails?.City}</p>
                <p><span className='font-bold'>Country</span>: {userdetails?.country}</p>
                <div>
                    <h1 className="my-3 font-bold text-xl underline">Previous Order</h1>
                    <table className='basic'>
                        <thead>
                            <tr>
                                <th className='text-lg '>OrderId</th>
                                <th className='text-lg '>Amount</th>
                                <th className='text-lg '>Status</th>
                                <th className='text-lg'>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderfound.length > 0 && orderfound.map(order => (
                                    <tr key={order._id} onClick={()=>{setOrderdetail(true);setListproduct(order.products);findproduct(order.products)}} >
                                        <td>{order.orderId}</td>
                                        <td>₹{order.amount}</td>
                                        <td>{order.status}</td>
                                        <td>{order.orderstatus}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        orderdetail &&
                        <DetailedOrder list={listProduct} />
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Accountpage