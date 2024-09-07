import React, { useContext, useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import EcomContext from '../Context/Ecomcontext'

const Product = () => {

    const {fetchAllProducts,allProducts,setproductId,deletePro} = useContext(EcomContext)
    const navigate = useNavigate()

    useEffect(()=>{
        fetchAllProducts()
    },[navigate])


  return (
    <>
        <div className="">
            <Link to={`/products/new`} className='bg-blue-900 text-white rounded-md py-1 px-2 '>
                <i className="fa-solid fa-plus mr-2"></i>Add New Product
            </Link>
            <table className='basic mt-4 shadow-md'>
                <thead>
                    <tr>
                        <td>Product name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map( product =>{
                            const Productid = product._id
                            return(
                                <tr key={product._id}>
                                    <td>{product.title}</td>
                                    <td>
                                        <Link to={"/products/edit/"+Productid} className='btn-default' onClick={()=>setproductId(Productid)}>
                                            <i className='fa-solid fa-pencil'></i>
                                            Edit
                                        </Link>
                                        <Link to={"/products/delete/"+Productid} className='btn-red' onClick={()=>setproductId(Productid)} >
                                            <i className='fa-solid fa-trash'></i>
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Product