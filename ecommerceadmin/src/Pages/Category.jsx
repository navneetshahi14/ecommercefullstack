import React, { useContext, useEffect, useState } from 'react'
import EcomContext from '../Context/Ecomcontext'
import { useLocation, useNavigate } from 'react-router-dom'

const Category = () => {

    const [editedCategory,setEditedCategory] = useState(null)
    const [catename,setCatname] = useState("")
    const navigate = useNavigate()
    const [parentCate,setParentcat] = useState()
    const [properties,setProperties] = useState([])
    const [isDisable,setIsdisable] = useState(true)

    const {pathname} = useLocation()

    const {createCat,showCategory,allcate,updateCategory,deleteCate} = useContext(EcomContext)

    const handleCategory =async()=>{
        
        if(editedCategory){
            const updation = await updateCategory(editedCategory._id,catename,parentCate,properties)
            alert(updation)
            navigate('/category')
        }else{
            const creation = await createCat(catename,parentCate,properties)
            alert(creation)
            if(creation==="category created successfully"){
                navigate('/category')
            }else{
                navigate("/category")
            }
        }
        showCategory()
        setCatname("")
        setParentcat()
        setEditedCategory(null)
        setProperties([])
    }

    useEffect(()=>{
        showCategory()
    },[])


    const editCategory = (category) =>{
        setEditedCategory(category)
        setCatname(category.name)
        setParentcat(category.parent?._id) 
        setProperties(category.properties.map(({name,values})=>({
            name,
            values:values.join(',')
        })))
    }


    const handledelete = async(id,name) =>{

        // confirm("do you want to delete")

        if(window.confirm("Do you want to delete "+name)){
            const data =  await deleteCate(id)
            alert(data)
        }
        
        navigate('/category')
        showCategory()
    }

    function AddProperty(){
        setProperties(prev=> {
            return [...prev, {name:"",values:""}];
        });
    }

    function handlePropertyname(index,property,newname){
        setProperties(prev=>{
            const properties = [...prev];
            properties[index].name = newname;
            return properties;
        })
    }
    function handlePropertyvalues(index,property,newValues){
        setProperties(prev=>{
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        })
    }


    function removeProperty(indexToRemove){
        setProperties(prev => {
            return [...prev].filter((p,pindex)=>{
                return pindex !== indexToRemove
            })

        })
    }

  return (
    <>
    <div className=''>
        <h1>Category</h1>

        <label >
            {
                editedCategory?`Edit Category ${editedCategory.name}`:"Create New Category"
            }
        </label>
        <div className="flex flex-col items-start">
            <div className="flex gap-1 w-full">
                <input value={catename} onChange={(e)=>setCatname(e.target.value)} type="text" name="" id="" placeholder={'Category'} />
                <select value={parentCate} onChange={(e)=>setParentcat(e.target.value)}>
                    <option value="0">No parent category</option>
                    {
                                allcate.map(category => {
                                    return(
                                        <option value={category._id}>{category.name}</option>
                                    )
                                })    
                            
                        }
                </select>
            </div>
            <div>
                <label>Properties</label>
                <button type='button' onClick={AddProperty} className='btn-default flex gap-1 items-center justify-center text-sm my-1 '><i className="fa-solid fa-plus"></i>Add new Property</button>
                {
                    properties.length > 0 && properties.map((property,index)=>{
                        return(
                            <div className="flex gap-1 mb-2">
                                <input type="text" className='mb-0' value={property.name} onChange={(ev)=>handlePropertyname(index,property,ev.target.value)} placeholder='property name (example:color)' />
                                <input type="text" className='mb-0' value={property.values} onChange={(ev)=>handlePropertyvalues(index,property,ev.target.value)} placeholder='value , comma seprated' />
                                <button onClick={()=>removeProperty(index)} className="btn-red">Remove</button>
                            </div>
                        )
                        
                    })
                }
            </div>
            
            <div className="flex gap-1">
                {editedCategory&&(
                    <button onClick={()=>{setEditedCategory(null);setCatname('');setParentcat("");setProperties([])}} className='btn-default'>Cancel</button>
                )}
                <button onClick={handleCategory} className={`btn-primary py-1 rounded-sm `}>{editedCategory?"Update":"Save"}</button>
            </div>

        </div>
        <div className="flex flex-col">
            {
                !editedCategory && (

                    <table className='basic mt-4'>
                        <thead>
                            <tr>
                                <td>Category Name</td>
                                <td>Parent Name</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (allcate?.length > 0 )?
                                    allcate.map(category => {
                                        return(
                                            <tr key={category._id} >
                                                <td>{category.name}</td>
                                                <td>{category?.parent?.name}</td>
                                                <td>
                                                    <button className='btn-default text-sm mr-1 mb-1 md:mb-0 md:w-auto w-full' onClick={()=>editCategory(category)}>Edit</button>
                                                    <button className='btn-red text-sm w-full md:w-auto' onClick={()=>handledelete(category._id,category.name)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })    
                                :
                                <h1>No Category created</h1>
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    </div>
    </>
  )
}

export default Category