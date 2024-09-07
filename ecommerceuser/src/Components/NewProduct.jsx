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
        <div className="max-w-[1200px] mx-auto my-0 px-[20px] py-0 ">
            <h1 className="text-[2rem] pl-10 mt-[30px] mx-0 mb-[20px] font-[500] cursor-pointer">
                New Arriavls
            </h1>
            <div className="grid  grid-cols-3 gap-8 pt-5">
                {newProduct?.length> 0 && newProduct.map(product=>(
                    <ProductBox products={product} />
                ))}
            </div>
        </div>
    </>
  )
}

export default NewProduct