import React, { useContext } from 'react'
import Headers from '../Components/Headers'
import Features from '../Components/Features'
import NewProduct from '../Components/NewProduct'

const HomePage = () => {

  return (
    <>
        <div className='w-full min-h-screen h-auto overflow-x-hidden'>
            <Headers/>
            <Features  />
            <NewProduct />
        </div>
    </>
  )
}

export default HomePage