import React, { useEffect } from 'react'
import { useContext } from 'react'
import EcomContext from '../Context/Ecomcontext'
import { useState } from 'react'

const FeaturedPage = () => {

    const {allProducts,fetchAllProducts,setFeatured,newfeatured,getfeatured,featuredproducts} = useContext(EcomContext)
    const [currentid,setCurrentid] = useState()


    useEffect(()=>{
        fetchAllProducts()
        getfeatured()
    },[])

    const handleFeatured =()=>{
        console.log(newfeatured)
        let previd = newfeatured

        setFeatured(previd || null,currentid)
        fetchAllProducts()
        getfeatured()
    }



  return (
    <>
        <div className="">
            <h1>Featured Product</h1>
            
            <label>Select Product To Be Featured</label>
            <select onChange={ev=>setCurrentid(ev.target.value)}>
                <option value="">No Value</option>
                {
                    allProducts.map(product=>(
                        <option value={product._id}>{product.title}</option>
                    ))
                }
            </select>
            <button onClick={()=>handleFeatured()} className='bg-primary p-4 py-1 rounded text-gray-300'>Save</button>
            <div className="">
                <h1>FeaturedProduct</h1>
                <table className='basic'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newfeatured.length>0 && allProducts.map(product =>{
                                if(product._id === featuredproducts){
                                    return(
                                        <tr key={product._id} >
                                            <td>{product.title}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    )
                                }else if(featuredproducts.length === 0){
                                    return(
                                        <p>No Product featured</p>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default FeaturedPage