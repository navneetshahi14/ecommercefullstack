import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EcomuserContext from '../Context/EcomuserContext'
import Headers from '../Components/Headers'

const ProductPage = () => {

  const {Pid} = useParams()
  const { showcaseProduct,productshowcase,addtocart } = useContext(EcomuserContext)

  useEffect(()=>{
    productshowcase(Pid)
  },[])

  return (
    <>
      <div className="flex flex-col h-screen w-full overflow-hidden ">
        <Headers />
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-1/2 h-full flex justify-center items-center">
            <img src={showcaseProduct?.image} alt="" className="" />
          </div>
          <div className=' overflow-y-scroll w-1/2 h-[90%] p-10 box-content flex flex-col gap-4 shadow-md'>
            <h1 className="text-3xl">{showcaseProduct.title}</h1>
            <h2 className="text-xl">₹{showcaseProduct.price}</h2>
            <p className="text-lg font-bold">{showcaseProduct.description}</p>
            <button className='bg-purple-500 text-white p-2 rounded shadow-lg' onClick={()=>addtocart(showcaseProduct._id)}>Add To Cart</button>
          </div>

        </div>
        
      </div> 
    </>
  )
}

export default ProductPage