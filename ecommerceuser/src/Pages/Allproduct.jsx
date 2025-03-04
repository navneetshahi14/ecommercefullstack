import React from 'react'
import Headers from '../Components/Headers'
import { useContext } from 'react'
import EcomuserContext from '../Context/EcomuserContext'
import ProductBox from '../Components/ProductBox'

const Allproduct = () => {

    const {products} = useContext(EcomuserContext)


  return (
    <>
        <div className="">
            <Headers />
            <div className="flex md:flex-row flex-col p-6 items-center gap-5 flex-wrap ">
                {
                    products.map(product =>(
                        <ProductBox key={product._id} products={product} />
                    ))
                }
                
            </div>
        </div>
    </>
  )
}

export default Allproduct