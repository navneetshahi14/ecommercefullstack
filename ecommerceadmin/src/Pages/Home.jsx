import React, { useContext, useEffect } from 'react'
import EcomContext from '../Context/Ecomcontext'
import {Line,LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const Home = () => {
    const {user,orders,getAllOrders,allProducts,fetchAllProducts} = useContext(EcomContext)
    let earning = 0

    useEffect(()=>{
      getAllOrders()
      fetchAllProducts()
    },[])

  return (
    <>
        <div className="text-blue-900 overflow-y-auto">
          Hello , <b>{user.name}</b>
          <div className="my-8">
            <LineChart width={1000} height={400} data={orders}>
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <YAxis />
            </LineChart>
          </div>
          <div className="flex gap-5 w-full p-3 pb-10 h-auto">
            <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col justify-center items-center">
              <h2 className='text-xl font-bold text-black'>No of Orders</h2>
              <p className='text-lg text-gray-800'>{orders.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col justify-center items-center">
              <h2 className='text-xl font-bold text-black'>No of Products</h2>
              <p className='text-lg text-gray-800'>{allProducts.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col justify-center items-center">
              <h2 className='text-xl font-bold text-black'>Total Earning</h2>
              {
                orders.length > 0 && 
                  orders.map((e)=>{
                    if(e.status === "success"){
                      earning = earning + parseInt(e.amount)
                    }
                  })
              }
              <p className='text-lg text-gray-800'>₹{earning}</p>
            </div>
            
          </div>
        </div>
    </>
  )
}

export default Home