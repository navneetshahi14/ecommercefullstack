import React, { useEffect, useState } from 'react'
import EcomuserContext from './EcomuserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const EcomUserState = ({children}) => {

    const [products,setProducts] = useState([])
    const [newProduct,setNewProducts] = useState([])
    const [cartProduct,setCartProduct] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [featured,setFeatured] = useState({})
    const [allproducts,setAllproducts] = useState([])
    const [cartIt,setCartIt] = useState([])
    const [user,setUser] = useState({})
    const [logged,setLogged] = useState(JSON.parse(localStorage.getItem('loggedIn')) || false)
    const [addressform,setAddressform] = useState(false)
    const [userdetails,setuserdetails] = useState({})
    const [usersId,setUsersId] = useState(JSON.parse(localStorage.getItem('userId')) || "")
    const [orderdetail,setOrderdetail] = useState(false)
    const [detailedproduct,setDetailedProduct] = useState([])


    const handlePayment =async(userId,receipt,amount)=>{
        const {data} = await axios.post('https://ecommerce-backend-six-theta.vercel.app/payment/createOrder',{
            amount:amount,
            currency:"INR",
            receipt:receipt,
            userId,
            products:cartProduct
        })

        const options ={
            key:"rzp_test_rVgBYp3GHn7YId",
            amount:data.amount,
            currency:data.currency,
            name:"Navneet Ecommerce",
            description:"Test transaction",
            order_id:data.id,
            handler:async (response) =>{
                const verifyUrl = 'https://ecommerce-backend-six-theta.vercel.app/payment/verifyPayment'

                const verificationData={
                    razorpay_order_id:response.razorpay_order_id,
                    razorpay_payment_id:response.razorpay_payment_id,
                    razorpay_signature:response.razorpay_signature
                }

                const result = await axios.post(verifyUrl,verificationData)
                alert(result.data.status)

            },
            theme:{
                color:"#3399cc"
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }


    const navigate = useNavigate()


    useEffect(()=>{
        
        getProducts()
        setUser(localStorage.getItem('user'))
        viewdetails()

    
    },[])


    const addtocart=(productid)=>{
        try{
            if(logged === true){
                setCartProduct(prev=>[...prev,productid])
            }else{
                alert("you are not logged in")
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>  {
        if(cartProduct.length > 0){
            localStorage.setItem("cart",JSON.stringify(cartProduct))
        }
    },[cartProduct])


    const getProducts = async()=>{
        try{
            const data = await fetch('https://ecommerce-backend-six-theta.vercel.app/user/allProduct',{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application."
                }
            })
    
            const resData = await data.json()
            setProducts(resData)
            return resData
        }catch(err){
            console.log(err)
        }
        
    }


    const getnewProducts = async()=>{
        try{
            const data = await fetch("https://ecommerce-backend-six-theta.vercel.app/user/newProduct",{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                }
            })
    
            const resData = await data.json()
            settingfeaturedproducts()
            setLogged(JSON.parse(localStorage.getItem('loggedIn')))
            setNewProducts(resData)
            return resData
        }catch(err){
            console.log(err)
        }
        
    }

    const allProduct = async() =>{
        try{
            const data = await fetch("https://ecommerce-backend-six-theta.vercel.app/user/allProduct",{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                }
            })
            
            const resdata = await data.json()
            setAllproducts(resdata)
            return resdata
        }catch(err){
            console.log(err)
        }
    }

    const getfeatured = async()=>{
        try{
            const data = await fetch("https://ecommerce-backend-six-theta.vercel.app/user/getFeatured",{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                }
            })
    
            const resdata = await data.json()
            console.log(resdata)
            console.log(typeof(resdata.productid))
    
            return resdata
        }catch(err){
            console.log(err)
        }
        

    }

    const cartProducts = async() =>{
        try{
            const data = await fetch('https://ecommerce-backend-six-theta.vercel.app/user/cartproduct',{
                method:"POST",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(cartProduct)
            })
    
            const resdata = await data.json()
            setCartIt(resdata)
            
        }catch(err){
            console.log(err)
        }
        
    }

    const settingfeaturedproducts = async()=>{
        try{
            const all =  await allProduct()
            console.log(all)
            setAllproducts(all)
            const produc = await getfeatured()
            console.log(produc)
            const productid = produc.productid
    
            all.map(product =>{
                console.log(typeof(product._id))
                if(product._id == productid){
                    console.log(product)
                    setFeatured(product)
                }else{
                    return
                }
            })
        }catch(err){
            console.log(err)
        }
        

    }

    const removefromcart = (id) =>{
        try{
            setCartProduct(prev =>{
                const pos = prev.indexOf(id)
                if(pos !== -1){
                    return prev.filter((value,index)=> index !== pos)
                }
                return prev
            })
        }catch(err){
            console.log(err)
        }
        
    }

    const updatingAddress = async(phoneNo,address,postal,city,country) =>{
        
        try{

            const data = await fetch('https://ecommerce-backend-six-theta.vercel.app/user/addingaddress',{
                method:"POST",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({                
                    userId:usersId,
                    address:address,
                    postal:postal,
                    City:city,
                    Country:country,
                    PhoneNo:phoneNo
                })
            })
    
            const resdata = await data.text()
            alert(resdata)
            setAddressform(false)

        }catch(err){

            console.log(err.message)

        }
        
    }

    const viewdetails = async() =>{
        try{
            let length = localStorage.getItem('userId').length
            let userid = localStorage.getItem('userId').substring(1,length-1)
    
            const res = await fetch(`https://ecommerce-backend-six-theta.vercel.app/user/viewsdetails/${usersId}`,{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const resdata = await res.json()
    
            
            console.log(resdata)
            setuserdetails(resdata[0])
        }catch(err){
            console.log(err)
        }

        
    }

    const [showcaseProduct,setShowcaseProduct] = useState([])

    const productshowcase = async(productid) =>{
        try{
            const res = await fetch(`https://ecommerce-backend-six-theta.vercel.app/user/product/${productid}`,{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                }
            })
    
            const resdata = await res.json()
    
            setShowcaseProduct(resdata)
        }catch(err){
            console.log(err)
        }
        
    }

    const [orderfound,setOrderfound] = useState([])

    const findorders = async() =>{
        try{
            const res = await fetch(`https://ecommerce-backend-six-theta.vercel.app/user/order/${usersId}`,{
                method:"GET",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const resdata = await res.json()
            console.log(resdata)
            setOrderfound(resdata)
        }catch(err){
            console.log(err)
        }
        

    }

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    const findproduct = async(productid) =>{
        try{
            console.log(productid)

            const pro = await removeDuplicates(productid)
            console.log(pro)
            const res = await fetch(`https://ecommerce-backend-six-theta.vercel.app/user/productfind`,{
                method:"POST",
                mode: 'no-cors',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({products:pro})
            })
    
            const resdata = await res.json()
    
            setDetailedProduct(resdata)
        }catch(err){
            console.log(err)
        }
        
    }

    const value = {products,setProducts,getnewProducts,newProduct,cartProduct,setCartProduct,addtocart,featured,getfeatured,getProducts,allproducts,allProduct,settingfeaturedproducts,cartProducts,cartIt,removefromcart,logged,user,setUser,setLogged,addressform,setAddressform,updatingAddress,userdetails,viewdetails,handlePayment,showcaseProduct,productshowcase,orderfound,findorders ,orderdetail,setOrderdetail,findproduct,detailedproduct,setDetailedProduct }
  return (
    <EcomuserContext.Provider value={value}>
        {children}
    </EcomuserContext.Provider>
  )
}

export default EcomUserState