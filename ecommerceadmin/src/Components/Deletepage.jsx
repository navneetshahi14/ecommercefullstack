import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EcomContext from '../Context/Ecomcontext'

const Deletepage = () => {

    const navigate = useNavigate()
    const {allProducts,deletePro} = useContext(EcomContext)
    const param = useParams()

    const goBack = ()=>{
        navigate("/products")
    }

    const handleDelete = async() =>{
        const deleted = await deletePro(param.Productid)
        alert(deleted)
        if(deleted === "Deleted Successfully"){
            // alert("inside this")
            navigate('/products')
        }
    }

  return (
    <>
        <div className=''>
            <h1 className='text-center my-5'>Do You Want to delete the Product</h1>
            <div className="flex gap-2 justify-center">
                <button className=" btn-red" onClick={handleDelete}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>
        </div>
    </>
  )
}

export default Deletepage