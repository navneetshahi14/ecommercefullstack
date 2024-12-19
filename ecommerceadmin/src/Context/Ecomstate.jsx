import React, { useEffect, useState } from 'react'
import EcomContext from './Ecomcontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Ecomstate = ({children}) => {


    const [user,setUser] = useState({})
    const [useremail,setUseremail] = useState()
    const [logged,setLogged] = useState(false)
    const [allProducts,setAllproducts] = useState([])
    const [productId,setproductId] = useState()
    const [allcate,setAllcate] = useState([])
    const [shownav,setShownav] = useState(false)
    const [newfeatured,setnewfeatured] = useState("")
    const [featuredproducts,setnewfeaturedproducts] = useState()
    const [orders,setorders] = useState([])
    const [allUser,setallUser] = useState([])
    const [orderShow,setOrderShow] = useState(false)
    const [detailedproduct,setDetailedProduct] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        
        const userInfo = JSON.parse(localStorage.getItem('user'))
        const isLogged = localStorage.getItem("isLoggedIn")

        setLogged(isLogged)
        setUser(userInfo)

        if(!userInfo){
            navigate('/login')
        }

    },[])


    useEffect(()=>{
        if(logged){
            if(window.location.href === "https://ecommerce-admin-smoky-phi.vercel.app/login"||window.location.href === "https://ecommerce-admin-smoky-phi.vercel.app/register"||window.location.href === "https://ecommerce-admin-smoky-phi.vercel.app/otpcheck"){
                navigate('/')
            }
        }
    },[logged])

    
    const registerUser = async(name,email,password,type)=>{
        try{

            const res = await fetch('/auth/register',{
                method:"POST",
                
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    type:type
                })
            })

            const resdata = await res.json()

            return resdata

        }catch(err){
            console.log(err.message)
        }
    }

    const checkotp = async(otp,email)=>{
        try{

            const res = await fetch("/auth/checkotp",{
                method:"POST",
                
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    otp:otp
                })
            })

            const resdata = await res.json()

            setUser(resdata)

            return resdata

        }catch(err){
            console.log(err.message);
        }
    }


    const authlogin = async(email,password)=>{
        try{
            
            const res = await fetch("/auth/login",{
                method:"POST",
                
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
            })

            const resdata = await res.json()

            return resdata

        }catch(err){
            console.log(err.message)
        }
    }

    const AddProduct = async(productname,productdescription,productprice,category,property,images) =>{

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${user.token}`
            }
        }
        
        const data1 = JSON.stringify({
            productname:productname,
            productdescription:productdescription,
            productprice:productprice,
            category:category,
            property:property,
            images:images
        })

        const {data} = await axios.post('/admin/addproduct',data1,config)

        return data
    }

    const fetchAllProducts = async()=>{
        try{
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
        
            await axios.get('/admin/allproduct',config).then(response=>{
                console.log("Product fetched:-> ",response.data)
                setAllproducts(response.data)
    
            })

        }catch(err){
            console.log(err.message)
        }
        
    }


    const Updatingpro = async(id,title,description,price,pic,category,productproperty) =>{
        try{

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }

            const productup ={
                id:id,
                title:title,
                description:description,
                price:price,
                image:pic,
                category:category,
                property:productproperty
            }

            const {data} = await axios.post('/admin/updateproduct',productup,config)

            return data

        }catch(err){
            console.log(err.message);
        }
    }

    const deletePro = async(id)=>{
        try {
            
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.post('/admin/deleteproduct',{id},config)
            return data
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const createCat = async(name,parentCate,properties)=>{
        try{

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.post('/admin/categoryCreation',{catename:name,parent:parentCate,properties:properties.map(p=>({name:p.name,values:p.values.split(',')}))},config)

            return data

        }catch(err){
            console.log(err.message)
        }
    }


    const showCategory = async () =>{
        try{
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }
    
            const {data}= await axios.get('/admin/categoryshow',config)
    
            setAllcate(data)

        }catch(err){
            console.log(err.message)
        }
    }

    const updateCategory = async (id,name,parent,properties)=>{
        try{
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }
    
            const {data} = await axios.post('/admin/categoryUpdate',{cateId:id,name,parent,properties:properties.map(p=>({name:p.name,values:p.values.split(',')}))},config)
    
            return data

        }catch(err){
            console.log(err.message)
        }
    }
    
    const deleteCate = async(id)=>{
        try{
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${user.token}`
                }
            }
    
            const {data} = await axios.post('/admin/categorydelete',{id:id},config)
    
            return data
        }catch(err){
            console.log(err.message)
        }
    }

    const setFeatured = async(prev,id) =>{
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${user.token}`
            }
        }

        const body ={
            previd:prev,
            currentid:id
        }

        const {data} = await axios.post('/admin/setFeatured',body,config)

        return data
    }

    const getfeatured = async () =>{
        try{

            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
    
            const {data} = await axios.get('/admin/getFeatured',config)
            
            if(data.msg === "No product featured"){
                console.log(data.msg)
            }
            setnewfeaturedproducts(data.productid)
            setnewfeatured(data.previd)

        }catch(err){
            console.log(err)
        }
        
    }

    const getAllOrders = async() =>{
        try{
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
    
            const {data} = await axios.get('/admin/Getorders',config)
    
            setorders(data)
        }catch(err){
            console.log(err)
        }
        
    }

    

    const showalluser = async()=>{
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${user.token}`
            }
        }

        const {data} = await axios.get('/admin/alluser',config)
        console.log(data)

        setallUser(data)
    }

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    const findproduct = async(productid) =>{

        const pro = await removeDuplicates(productid)
        
        const res = await fetch(`/user/productfind`,{
            method:"POST",
            
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({products:pro})
        })

        const resdata = await res.json()

        setDetailedProduct(resdata)
    }


  return (
    <EcomContext.Provider value={{authlogin,user,checkotp,registerUser,useremail,setUseremail,logged,AddProduct, allProducts,fetchAllProducts,productId,setproductId,Updatingpro,deletePro,createCat,showCategory,allcate,updateCategory,deleteCate,shownav,setShownav,getfeatured,setFeatured,newfeatured,featuredproducts,getAllOrders , orders,allUser,showalluser,orderShow,setOrderShow,detailedproduct,setDetailedProduct,findproduct}} >
        {children}
    </EcomContext.Provider>
  )
}

export default Ecomstate