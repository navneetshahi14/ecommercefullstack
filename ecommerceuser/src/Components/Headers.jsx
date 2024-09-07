import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import EcomuserContext from '../Context/EcomuserContext'

const Headers = () => {

    const {cartProduct,logged} = useContext(EcomuserContext)

    const navclass = 'text-[#aaa]  '
  return (
    <>
        <header className='w-full h-auto bg-[#222] text-white p-1'>
            <div className="max-w-[1200px] mx-auto my-0 px-[20px] py-0 ">
                <div className=" flex justify-between py-[20px] px-0">
                    <Link to={'/'} >Ecommerce</Link>
                    <nav className='flex gap-4'>
                        <Link className={navclass} to={'/'}>Home</Link>
                        <Link className={navclass} to={'/AllProduct'}>All Product</Link>
                        <Link className={navclass} to={'/Account'}>Account</Link>
                        {
                            (logged === true)?<Link className={navclass} to={'/Cart'}>Cart({cartProduct.length})</Link>:<Link to={'/login'} className={navclass}>Login</Link>
                        }
                    </nav>
                </div>
            </div>
        </header>
    </>
  )
}

export default Headers