import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import EcomuserContext from '../Context/EcomuserContext'


const ProductBox = ({products}) => {
    const navigate = useNavigate()

    const {addtocart} = useContext(EcomuserContext)

    const url = '/product/'+products._id


  return (
    <>
        <div className='flex flex-col items-center justify-center cursor-pointer overflow-hidden border-[1px] md:w-[30vw] w-[80vw] border-gray-800 rounded-md p-2 shadow-md ' >
            
            <div onClick={()=>navigate(url)} className="bg-white p-5 h-[150px] w-auto min-w-[80%] flex items-center justify-center rounded-lg ">
                <img src={products.image[0]} className='max-w-[100%] max-h-[100px] ' alt="" />
            </div>
            <div className="mt-2 min-w-[80%]  ">
                <h2 className=" font-normal text-inherit text-[1rem]  ">
                    {products.title}
                </h2>
                <div className="flex md:flex-row flex-col items-center justify-between mt-1 gap-2 ">
                    <div className='md:text-[1.5rem] text-[1rem] font-[500] md:w-auto w-full'>
                        ₹{products.price}
                    </div>
                    <div className='md:w-auto w-full' >
                        <button onClick={()=>addtocart(products._id)} className='bg-transparent text-sm md:text-lg w-[90%] md:w-auto p-4 rounded-lg flex items-center justify-center py-1 border-[1px] border-primary text-primary gap-1 hover:bg-primary hover:text-white hover:border-white '><i className="fa-solid fa-cart-shopping"></i>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </>
)
}

export default ProductBox
