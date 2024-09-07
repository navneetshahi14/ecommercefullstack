import React, { useContext, useEffect, useState } from 'react'
import EcomContext from '../Context/Ecomcontext'
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {

    const [productname,setProductname] = useState()
    const [productdescription,setProductDescription] = useState()
    const [productprice,setProductPrice] = useState()
    const [cate,setCate] = useState()
    const [productproperties,setProductproperties] = useState({})
    const [categories,setCategories] = useState([])
    const [images,setImages]=useState([])
    const [cross,setCross] = useState(false)
    // console.log(cross);

    const navigate = useNavigate()

    const {AddProduct,showCategory,allcate} = useContext(EcomContext)

    useEffect(()=>{
        showCategory()
        setCategories(allcate)
        
    },[])

    const handleSumbit =async()=>{
        const adding = await AddProduct(productname,productdescription,productprice,cate,productproperties,images)
        console.log(adding)
        if(adding === "Product Added Successfully"){
            navigate('/products')
            alert(adding)
        }else{
            return
        }
    }

    const changeProductprop =(name,value)=>{
        setProductproperties(prev=> {
            const newProductproperty = {...prev}
            newProductproperty[name] = value
            return newProductproperty
        })        
    }

    const uploadimage =async(pics)=>{
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData()
            data.append('file',pics)
            data.append('upload_preset',"Ecomapplication")
            data.append("cloud_name","dfr6qnt6a")
            const res = await fetch("https://api.cloudinary.com/v1_1/dfr6qnt6a/image/upload",{
                method:"post",
                body:data
            })

            const resdata = await res.json()
            const url = await resdata.url.toString()

            if(url){
                alert("Upload Successfully")
                setImages([...images,url])
            }

        }
    }

    const propertiesTofill = [];
    if(categories.length > 0 && cate){
        let cateInfo = categories.find(({_id}) =>_id === cate)
        propertiesTofill.push(...cateInfo.properties)
        while(cateInfo?.parent?._id){
            const parentC = categories.find(({_id})=> _id === cateInfo?.parent?._id)
            propertiesTofill.push(...parentC.properties)
            cateInfo = parentC
        }
    }
    

    const imageRemove=(pic) =>{
        setImages(images.filter((e)=>e!==pic))
    }


  return (
    <>
        <div className="">
            <h1 >New Product</h1>

            <label htmlFor="">Product Name</label>
            <input type="text" value={productname} placeholder='Product name' onChange={(e)=>setProductname(e.target.value)} />

            <label >Category</label>
            <select value={cate} onChange={(e)=>setCate(e.target.value)}>
                <option value="">Uncategorized</option>
                {
                    allcate.map(e =>{
                        return(
                            <option value={e._id}>{e.name}</option>
                        )
                    })
                }
            </select>
            
            {propertiesTofill.length>0 && propertiesTofill.map(p=>(
                <div className="flex gap-1">
                    <div>{p.name}</div>
                    <select value={productproperties[p.name]} onChange={ev=>changeProductprop(p.name,ev.target.value)}>
                        {
                            p.values.map(v => (
                                <option value={v} >{v}</option>
                            ))
                        }    
                    </select> 
                </div>
            ))}

            <label >Photos</label>
            <div className="mb-2">
                <div className="flex gap-4">
                    {
                        images.length >0 && images.map((e,index)=>(
                            <div className={`relative flex w-24 h-24 justify-center items-center`} onMouseEnter={()=>setCross(true)} onMouseLeave={()=>setCross(false)}>
                                <img src={e} alt="" className="w-auto h-full border shadow-sm border-gray-400 p-3 rounded-md" />
                                {
                                    cross &&
                                    <i className={`fa-solid fa-xmark absolute text-primary cursor-pointer text-3xl`} onClick={()=>imageRemove(e)}></i>
                                }
                            </div>
                        ))
                    }
                    <label className="w-24 h-24 border-2 border-gray-400 shadow-md text-center text-sm text-gray-500 rounded-lg bg-gray-200 gap-2 flex items-center justify-center cursor-pointer overflow-hidden">
                    <i className="fa-solid fa-upload"></i>
                        <div>
                            Upload
                        </div>
                        <input type="file" accept='image/*' className='hidden' onChange={(e)=>uploadimage(e.target.files[0])} />

                    </label>
                </div>
            </div>

            <label htmlFor="">Description</label>
            <textarea placeholder='Description' value={productdescription} onChange={(e)=>setProductDescription(e.target.value)} ></textarea>

            <label htmlFor="">Price (in Rs)</label>
            <input type="number" placeholder='Price' value={productprice} onChange={(e)=>setProductPrice(e.target.value)} />

            <button onClick={handleSumbit} className='btn-primary'>Save</button>
        </div>
    </>
  )
}

export default NewProduct