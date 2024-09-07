import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import EcomContext from '../Context/Ecomcontext'
import { useLocation } from 'react-router-dom'
import Home from './Home'
import Product from './Product'
import NewProduct from './NewProduct'
import EditPage from '../Components/EditPage'
import Deletepage from '../Components/Deletepage'
import Category from './Category'
import FeaturedPage from '../Components/FeaturedPage'
import OrderPage from '../Components/OrderPage'

const DashBoard = () => {


  const {productId,shownav,setShownav} = useContext(EcomContext)
  const router = useLocation()

  const {pathname} =  router

  return (
    <>
      <div className='bg-bgGray min-h-screen'>
          <div className="max-h-screen w-full bg-highlight md:bg-bgGray flex overflow-hidden ">
            <button className=' flex items-start md:hidden ' onClick={()=>setShownav(true)}><i className="fa-solid fa-bars mt-2 mx-2"></i></button>
            <Navbar show={shownav} />

              <div className="bg-highlight h-auto md:max-h-[98%] shadow-md flex-grow md:mt-2 md:mr-2 md:rounded-lg p-4 mb-2 overflow-auto ">
              {
                (pathname==="/")&&
                  <Home />
              }
              {
                (pathname==="/products")&&
                  <Product />
              }
              {
                (pathname==="/products/new")&&
                  <NewProduct />
              }
              {
                (pathname === "/products/edit/"+productId)&&
                  <EditPage />
              }
              {
                (pathname === "/products/delete/"+productId)&&
                  <Deletepage />
              }
              {
                (pathname === "/category")&&
                  <Category />
              }
              {
                (pathname === '/featured')&&
                  <FeaturedPage />
              }
              {
                (pathname === '/orders')&&
                  <OrderPage />
              }
            </div>
          </div>
      </div>
    </>
  )
}

export default DashBoard