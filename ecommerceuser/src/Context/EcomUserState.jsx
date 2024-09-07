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
    const [logged,setLogged] = useState(JSON.parse(localStorage.getItem('loggedIn'))||false)
    const [addressform,setAddressform] = useState(false)
    const [userdetails,setuserdetails] = useState({})
    const [usersId,setUsersId] = useState(JSON.parse(localStorage.getItem('userId')))
    const [orderdetail,setOrderdetail] = useState(false)
    const [detailedproduct,setDetailedProduct] = useState([])


    const handlePayment =async(userId,receipt,amount)=>{
        const {data} = await axios.post('http://0.0.0.0:8000/payment/createOrder',{
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
                const verifyUrl = 'http://0.0.0.0:8000/payment/verifyPayment'

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
        if(logged === true){
            setCartProduct(prev=>[...prev,productid])
        }else{
            alert("you are not logged in")
        }
    }

    useEffect(()=>  {
        if(cartProduct.length > 0){
            localStorage.setItem("cart",JSON.stringify(cartProduct))
        }
    },[cartProduct])

    const getProducts = async()=>{
        const data = await fetch('http://0.0.0.0:8000/user/allProduct',{
            method:"GET",
            headers:{
                "Content-Type":"application."
            }
        })

        const resData = await data.json()
        setProducts(resData)
        return resData
    }


    const getnewProducts = async()=>{
        const data = await fetch("http://0.0.0.0:8000/user/newProduct",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

        const resData = await data.json()
        settingfeaturedproducts()
        setLogged(JSON.parse(localStorage.getItem('loggedIn')))
        setNewProducts(resData)
        return resData
    }

    const allProduct = async() =>{
        const data = await fetch("http://0.0.0.0:8000/user/allProduct",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        const resdata = await data.json()
        return resdata
        

    }

    const getfeatured = async()=>{
        const data = await fetch("http://0.0.0.0:8000/user/getFeatured",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

        const resdata = await data.json()
        console.log(resdata)
        console.log(typeof(resdata.productid))

        return resdata

    }

    const cartProducts = async() =>{
        console.log(cartProduct)
        const data = await fetch('http://0.0.0.0:8000/user/cartproduct',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(cartProduct)
        })

        const resdata = await data.json()
        setCartIt(resdata)
        
    }

    const settingfeaturedproducts = async()=>{
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

    }

    const removefromcart = (id) =>{
        setCartProduct(prev =>{
            const pos = prev.indexOf(id)
            if(pos !== -1){
                return prev.filter((value,index)=> index !== pos)
            }
            return prev
        })
    }

    const updatingAddress = async(phoneNo,address,postal,city,country) =>{
        
        try{

            const data = await fetch('http://0.0.0.0:8000/user/addingaddress',{
                method:"POST",
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

        let length = localStorage.getItem('userId').length
        let userid = localStorage.getItem('userId').substring(1,length-1)

        const res = await fetch(`http://0.0.0.0:8000/user/viewsdetails/${usersId}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const resdata = await res.json()

        
        console.log(resdata)
        setuserdetails(resdata[0])
    }

    const [showcaseProduct,setShowcaseProduct] = useState([])

    const productshowcase = async(productid) =>{
        
        const res = await fetch(`http://0.0.0.0:8000/user/product/${productid}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })

        const resdata = await res.json()

        setShowcaseProduct(resdata)
    }

    const [orderfound,setOrderfound] = useState([])

    const findorders = async() =>{

        const res = await fetch(`http://0.0.0.0:8000/user/order/${usersId}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const resdata = await res.json()
        console.log(resdata)
        setOrderfound(resdata)

    }

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    const findproduct = async(productid) =>{
        console.log(productid)

        const pro = await removeDuplicates(productid)
        console.log(pro)
        const res = await fetch(`http://0.0.0.0:8000/user/productfind`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({products:pro})
        })

        const resdata = await res.json()

        setDetailedProduct(resdata)
    }

    const value = {products,setProducts,getnewProducts,newProduct,cartProduct,setCartProduct,addtocart,featured,getfeatured,getProducts,allproducts,allProduct,settingfeaturedproducts,cartProducts,cartIt,removefromcart,logged,user,setUser,setLogged,addressform,setAddressform,updatingAddress,userdetails,viewdetails,handlePayment,showcaseProduct,productshowcase,orderfound,findorders ,orderdetail,setOrderdetail,findproduct,detailedproduct,setDetailedProduct }
  return (
    <EcomuserContext.Provider value={value}>
        {children}
    </EcomuserContext.Provider>
  )
}

export default EcomUserState