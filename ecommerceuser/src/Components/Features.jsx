import React, { useContext, useEffect, useState } from 'react'
import macbook from '../Assets/images/macbook.png'
import EcomuserContext from '../Context/EcomuserContext'

const Features = () => {

    const {addtocart,settingfeaturedproducts,featured} = useContext(EcomuserContext)
    const [images,setImages] = useState([])
    const [first,setFirst] = useState("")
    

    useEffect(()=>{

        settingfeaturedproducts()

    },[])

    useEffect(()=>{
        setImages(featured.image)

        console.log(images)
        if(images){
            setFirst(images[0])
        }

    },[featured])


  return (
    <>
        <div className='bg-[#222] py-12 px-0 text-white '>
            <div className="max-w-[1200px] mx-auto my-0 px-[20px] py-0 flex items-center justify-center ">
                <div className="grid grid-cols-2 gap-10 w-full ">
                    <div className='flex flex-col items-center justify-center'>
                        <div>
                            <h1 className='m-0 font-normal text-[3rem] mb-3'>{featured?.title}</h1>
                            <p className='text-[#aaa] text-sm '>{featured?.description}</p>
                            <div className='flex gap-5 mt-4'>
                                <button className='btn-default'>Read more</button>
                                <button onClick={()=>addtocart(featured?._id)} className='btn-cart inline-flex items-center justify-center hover:scale-[1.1]'><i className="fa-solid fa-cart-shopping mr-2"></i>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img className='max-w-full ' src={first} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Features