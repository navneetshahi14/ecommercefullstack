import React, { useContext } from 'react'
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import EcomContext from '../Context/Ecomcontext'

const Navbar = () => {

    const inActivelink = "flex gap-1 items-center "
    const activelink = inActivelink + "bg-highlight md:bg-highlight text-black md:text-blue-900 py-1 pl-1 rounded-sm md:rounded-r-none md:rounded-l-lg "
    const router = useLocation()
    const {pathname} = router
    const {productId,shownav,setShownav} = useContext(EcomContext)
    const navigate = useNavigate()
    

    const signOut =()=>{
        localStorage.clear()   
        window.location.reload()
    }

  return (
    <>
        <aside className={`text-gray-500 md:text-gray-500 p-4 md:pr-0 fixed md:h-screen h-full md:relative md:-left-0 w-full bg-bgGray md:bg-bgGray md:w-auto duration-500 transition-[left] ${shownav?"-left-0":"-left-full"} z-[2]`} >
            <i className="fa-solid fa-xmark absolute right-0 top-0 cursor-pointer mx-2 mt-1 mr-4 text-xl md:hidden" onClick={()=>setShownav(false)}></i>
            <Link className='flex gap-2 items-center mb-4 mr-4'>
                <i className="fa-solid fa-store text-primary md:text-blue-400"></i>
                <span className="">GullyMart(seller)</span>
            </Link>
            <nav className='flex flex-col gap-2'>
                <Link to={"/"} onClick={()=>setShownav(false)} className={(pathname==="/")?activelink:inActivelink} >
                    <i className="fa-solid fa-home text-primary md:text-blue-400"></i>
                    Dashboard
                </Link>
                <Link to={"/products"} onClick={()=>setShownav(false)} className={(pathname==="/products"|| pathname==='/products/new' || pathname === '/products/edit/'+productId || pathname === '/products/delete/'+productId)?activelink:inActivelink} >
                    <i className="fa-solid fa-box text-primary md:text-blue-400"></i>
                    Products
                </Link>
                <Link to={"/category"} onClick={()=>setShownav(false)} className={(pathname==="/category")?activelink:inActivelink} >
                    <i className="fa-solid fa-box text-primary md:text-blue-400"></i>
                    Category
                </Link>
                <Link to={"/featured"} onClick={()=>setShownav(false)} className={(pathname==="/featured")?activelink:inActivelink} >
                    <i className="fa-solid fa-pencil text-primary md:text-blue-400"></i>
                    Featured
                </Link>
                <Link to={"/orders"} onClick={()=>setShownav(false)} className={(pathname==="/orders")?activelink:inActivelink} >
                    <i className="fa-solid fa-list text-primary md:text-blue-400"></i>
                    Orders
                </Link>
                <button className={inActivelink} onClick={()=>signOut()}>
                    <i className="fa-solid fa-right-from-bracket text-primary md:text-blue-400"></i>
                    Logout
                </button>
                
            </nav>
        </aside>
    </>
  )
}

export default Navbar