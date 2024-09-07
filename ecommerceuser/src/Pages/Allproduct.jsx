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
            <div className="grid  grid-cols-3 gap-8 pt-5">
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