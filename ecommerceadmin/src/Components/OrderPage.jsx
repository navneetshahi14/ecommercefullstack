import React, { useContext, useEffect, useState } from 'react'
import EcomContext from '../Context/Ecomcontext'
import OrderDetails from './OrderDetails'

const OrderPage = () => {


    const {getAllOrders,orders,allUser,showalluser,orderShow,setOrderShow,findproduct} = useContext(EcomContext)

    const [orderdetails,setOrderdetails] = useState([])

    useEffect(()=>{
        getAllOrders()
        showalluser()
        console.log(orders)
    },[])

  return (
    <>
        <div className='relative overflow-y-hidden h-full'>
            <h1>Orders</h1>
            <table className="basic">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Recipient</th>
                        <th>PaymentId</th>
                    </tr>
                </thead>
                <tbody className='px-4 py-2'>
                    {
                        orders.length > 0 &&  orders.map(res=>(
                            <tr onClick={()=>{setOrderShow(true); setOrderdetails(res.products);findproduct(res.products) }} className='cursor-pointer hover:bg-gray-200'>
                                <td>{res.createdAt.replace("T"," ").substring(0,19)}</td>
                                <td>
                                    {
                                        allUser.map(e=>{
                                            if(e._id===res.userId){
                                                return(
                                                    e.name
                                                )
                                            }
                                        })
                                    }
                                </td>
                                <td>
                                    {
                                        res.paymentId
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                orderShow &&
                <OrderDetails order={orderdetails} />
            }
        </div>    
    </>
  )
}

export default OrderPage