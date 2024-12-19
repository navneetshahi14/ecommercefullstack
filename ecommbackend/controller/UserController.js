const featured = require('../model/FetcheredSchema')
const product = require('../model/Productschema')
const users = require('../model/userschema')
const userDetailsForm  = require('../model/userDetailForm')
const order = require('../model/orderSchema')

const AllProducts = async(req,res)=>{
    try {
        
        const Products = await product.find()

        if(Products){
            res.status(200).send(Products)
        }
        else{
            res.status(404).send("Somthing went wrong")
        }

    } catch (error) {
        console.log(error.message)
    }
}

const newProducts = async(req,res)=>{
    try{

        const newProducts = await product.find({},null,{sort:{'_id':-1},limit:10})

        if(newProducts){
            res.status(200).send(newProducts)
        }else{
            res.status(404).send("Something Went wrong")
        }

    }catch(err){
        console.log(err.message)
    }
}


const cartProducts = async(req,res) =>{
    try {
        
        const {ids} = req.body       

        res.json(await product.find({_id:ids}))

        
    } catch (error) {
        console.log(error.message)
    }
}

const getFeatured = async(req,res)=>{
    try{

        const featuredpro = await featured.findOne()

        res.status(200).json({productid:featuredpro.productid})

    }catch(err){
        console.log(err.message)
    }
}


// const orderedProduct = async(req,res) =>{
//     try {
//         // const {name,email,city,postal}
//     } catch (error) {
        
//     }
// }


const addingaddress = async(req,res) =>{
    try{
        const {userId,address,postal,City,Country,PhoneNo} = req.body

        const userfind = await userDetailsForm.find({userId:userId})
        console.log(userfind)

        if(userfind.length >0){
            const updateuser = await userDetailsForm.findOneAndUpdate({userId:userId},{
                $set:{
                    address:address,
                    postal:postal,
                    City:City,
                    country:Country,
                    PhoneNo:PhoneNo
                }
            })

            if(updateuser){
                res.status(200).send("Update Successfull")
            }else{
                res.status(404).send("something went wrong")
            }
        }
        else{
            const newdetails = userDetailsForm({
                userId:userId,
                PhoneNo:PhoneNo,
                postal:postal,
                City:City,
                country:Country,
                address:address
            })

            const newdetailsadded = await newdetails.save()

        }
    }catch(err){
        console.log(err.message)
    }
}

const viewdetails = async(req,res) =>{
    try{
        const userid = req.params.userid

        const finddetails = await userDetailsForm.find({userId:userid})

        res.status(200).send(finddetails)

    }catch(err){
        console.log(err.message)
    }
}


const productshowcase = async(req,res)=>{
    try{
        
        const {productid} = req.params

        const findproduct = await product.findById({_id:productid})

        res.status(200).send(findproduct)

    }catch(err){
        console.log(err.message)
    }
}

const findOrder = async(req,res) =>{
    try{
        const {userid} = req.params
        
        const ordersfind = await order.find({userId:userid}).sort({"createdAt":-1})
        
        res.status(200).send(ordersfind)
    }catch(err){
        console.log(err.message)
    }
}

const findproduct = async(req,res) =>{
    const {products} = req.body
    const allpro = []
    try{
        
        for(let i=0;i<products.length;i++){
            const findpro = await product.findById({_id:products[i]})
            allpro.push(findpro)
        }
       

        res.status(200).send(allpro)

    }catch(err){
        console.log(err.message)
    }
}


module.exports = {
    AllProducts,
    newProducts,
    cartProducts,
    getFeatured,
    addingaddress,
    viewdetails,
    productshowcase,
    findOrder,
    findproduct
    
}