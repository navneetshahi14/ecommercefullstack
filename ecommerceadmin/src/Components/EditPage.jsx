import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import EcomContext from '../Context/Ecomcontext'

const EditPage = () => {

    const params = useParams()
    const {allProducts,Updatingpro,showCategory,allcate} = useContext(EcomContext)
    const [Product,setProduct] = useState({})
    const [title,setTitle] = useState(Product.title)
    const [description,setDescription] = useState(Product.description)
    const [price,setPrice] = useState(Product.price)
    const [pic,setPic] = useState(Product.image)
    const [images,setImages] = useState([])
    const [cate,setCate] = useState("")
    const [productproperties,setProductproperties] = useState({})
    const [categories,setCategories] = useState([])
    const [cross,setCross] = useState(false)


    useEffect(()=>{
        showCategory()
        setCategories(allcate)
    },[])
    


    const navigate = useNavigate()

    useEffect(()=>{
        allProducts.map(product => {
            if(product._id ===params.Productid){
                setProduct(product)
                setImages(product.image)
                setTitle(product.title)
                setDescription(product.description)
                setPrice(product.price)
                setCate(product.category)
                setCategories(allcate)
            }
        })
    },[])

    const handleSubmit = async() =>{
        const updated = await Updatingpro(params.Productid,title,description,price,images,cate,productproperties)

        alert(updated)
        if(updated === "Updation Successfully"){
            navigate('/products')
        }

    }

    async function uploadimage(pics){
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
                alert("Upload successfully")
                setImages([...images,url])
            }

        }

    }


    const changeProductprop =(name,value)=>{
        setProductproperties(prev=> {
            const newProductproperty = {...prev}
            newProductproperty[name] = value
            return newProductproperty
        })        
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


    const imageRemove =(pic)=>{
        setImages(images.filter((e)=>e !== pic))
    }


  return (
    <>
        <div className="overflow-auto">
            <h1>Edit Product Here</h1>
            
            <label htmlFor="">Product Name</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />

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
                <div className="">
                    <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
                    <select value={productproperties[p.name]} onChange={ev=>changeProductprop(p.name,ev.target.value)}>
                        {
                            p.values.map(v => (
                                <option value={v} >{v}</option>
                            ))
                        }    
                    </select> 
                </div>
            ))}

            <label>Photos</label>
            <div className="mb-2 ">
                <div className="flex gap-4">
                    {
                        images.length > 0 && images.map((e)=>(
                            <div className={`relative flex justify-center items-center w-24 h-24`} onMouseEnter={()=>setCross(true)} onMouseLeave={()=>setCross(false)}>
                                <img src={e} alt="" className=" w-full h-full border shadow-sm border-gray-400 p-3 rounded-md" />
                                <i className={`fa-solid fa-xmark absolute
                                  text-primary cursor-pointer text-3xl ${cross?"inline":"hidden"} `} onClick={()=>imageRemove(e)}></i>
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

            <label htmlFor="">Product Description</label>
            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description'/>

            <label htmlFor="">Product Price(in Rs)</label>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Price' />

            <button onClick={handleSubmit} className='btn-primary'>Save</button>
        </div>
    </>
  )
}

export default EditPage