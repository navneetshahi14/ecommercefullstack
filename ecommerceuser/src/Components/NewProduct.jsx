import React, { useContext, useEffect } from 'react'
import EcomuserContext from '../Context/EcomuserContext'
import ProductBox from './ProductBox'

const NewProduct = () => {
    const {newProduct,getnewProducts,addtocart} = useContext(EcomuserContext)

    useEffect(()=>{
        getnewProducts()
    },[])
    console.log(newProduct)

  return (
    <>
        <div className="md:max-w-[90%] w-full mx-auto my-0 px-[20px] pb-3 ">
            <h1 className="text-[2rem] pl-10 mt-[30px] mx-0 mb-[20px] font-[500] cursor-pointer">
                New Arriavls
            </h1>
            <div className="flex flex-row flex-wrap gap-5 md:justify-center items-center w-[100%] overflow-x-auto ">
                {newProduct?.length> 0 && newProduct.map(product=>(
                    <ProductBox products={product} />
                ))}
            </div>
        </div>
    </>
  )
}

export default NewProduct