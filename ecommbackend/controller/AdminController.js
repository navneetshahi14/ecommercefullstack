const category = require('../model/Categoryschema')
const product = require('../model/Productschema')
const featured = require("../model/FetcheredSchema")
const orders = require('../model/orderSchema')
const user = require('../model/userschema')

const addProduct=async(req,res)=>{
    
    try{

        const {productname,productdescription,productprice,category,property,images} = req.body

        const newProduct = product({
            title:productname,
            description:productdescription,
            price:productprice,
            category:category,
            property:property,
            image:images
        })

        const added = await newProduct.save()

        if(added){
            res.status(200).send("Product Added Successfully")
        }else{
            res.status(303).send("Something went wrong")
        }

    }catch(err){
        console.log(err.message);
    }

}

const getAllproducts = async(req,res)=>{
    try{
        const products = await product.find()

        if(products){
            res.status(200).send(products)
        }else{
            res.status(404).send("Something went wrong")
        }
    }catch(err){
        console.log(err.message);
    }
}

const updateProduct = async(req,res) =>{
    try{
        const {id,title,description,price,image,category,property} = req.body

        const updateProduct = await product.findByIdAndUpdate({_id:id},{
            $set:{
                title:title,
                description:description,
                price:price,
                image:image,
                category:category,
                property:property
            }
        })
        

        if(updateProduct){
            res.status(200).send("Updation Successfully")
        }else{
            res.status(404).send("Something went wrong")
        }

    }catch(err){
        console.log(err.message)
    }
}

const deletetionProduct = async(req,res)=>{
    try {
        const {id} = req.body

        const productdeletion = await product.findByIdAndDelete({_id:id})
        
        if(productdeletion){
            res.status(200).send("Deleted Successfully")
        }else{
            res.status(404).send("Something went wrong")
        }

    } catch (error) {
        console.log(error.message);
    }
}

const categoryCreation = async(req,res) =>{
    try {
        const {catename,parent,properties} = req.body

        const newcategory = category({
            name:catename,
            parent:parent||undefined,
            properties:properties
        })

        const creation = await newcategory.save()

        if(creation){
            res.status(200).send("category created Successfully")
        }else{
            res.status(400).send("something went wrong")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const showCategory = async(req,res)=>{
    try{
        const categorys = await category.find().populate('parent')

        // console.log(categorys)
        res.status(200).send(categorys)

    }catch(err){
        console.log(err.message)
    }
}

const updateCategory = async(req,res) =>{
    try {
        const {cateId,name,parent,properties} = req.body

        const Cateupdate = await category.findByIdAndUpdate({_id:cateId},{
            $set:{
                name:name,
                parent:parent||undefined,
                properties:properties
            }
        })

        if(Cateupdate){
            res.status(200).send("Update Successfully")
        }else{
            res.status(400).send("Something went wrong")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const deleteCategory = async(req,res) =>{
    try{

        const {id} = req.body

        const categorydeleted = await category.findByIdAndDelete({_id:id})

        if(categorydeleted){
            res.status(200).send('Deleted Successfully')
        }else{
            res.status(400).send("Something went wrong")
        }
        
    }catch(err){
        console.log(err.message)
    }
}


const setFeaturedProduct = async(req,res) =>{
    try {
        
        const { previd,currentid } = req.body


        console.log(previd,currentid)

        if(previd === null){
        
            const addingfeatured = featured({productid:currentid})
            const addingsuccess = await addingfeatured.save()

            if(addingsuccess){
                res.status(200).send("Featured added successfully")
            }else{
                res.status(400).send("Something went wrong")
            }

        }else{
            const checkfeatured = await featured.find()
            if(checkfeatured.length >0){
                const deleteingfeatured = await featured.findByIdAndDelete({_id:previd})
                if(deleteingfeatured){
                    const addingfeatured = featured({productid:currentid})
                    const addingsuccess = await addingfeatured.save()

                    if(addingsuccess){
                        res.status(200).send("Featured added successfully")
                    }else{
                        res.status(404).send("Something went wrong")
                    }
                }
                else{
                    res.status(400).send("Something went wrong")
                }
            }
        }

    } catch (error) {
        console.log(error.message)
    }
}

const getFeatured = async(req,res)=>{
    try{

        const checkfeatured = await featured.find()
        console.log(checkfeatured)
        if(checkfeatured.length > 0){
            res.status(200).json({previd:checkfeatured[0]._id,productid:checkfeatured[0].productid})
        }else{
            res.status(300).json({msg:"No product featured"})
        }

    }catch(err){
        console.log(err.message)
    }
}

const fetchingOrders = async(req,res) =>{
    try{

        const oreders = await orders.find().sort({createdAt:-1})

        res.status(200).send(oreders)
    }catch(err){
        console.log(err.message)
    }
}

 const allUsers = async(req,res) =>{
    try{

        const allusers  = await user.find({type:"User"})
        console.log("allusers ",allusers)
        res.status(200).send(allusers)
        
    }catch(err){
        console.log(err.message)
    }
}

const updateorderstatus = async(req,res)=>{
    try{

        const {orderid,orderstatus} = req.body
        
        const ordereds = await orders.findByIdAndUpdate({_id:orderid},{
            $set:{
                orderstatus:orderstatus
            }
        })
        
        res.send('update successful')

    }catch(err){
        console.log(err.message)
    }
}


module.exports ={
    addProduct,
    getAllproducts,
    updateProduct,
    deletetionProduct,
    categoryCreation,
    showCategory,
    updateCategory,
    deleteCategory,
    setFeaturedProduct,
    getFeatured,
    fetchingOrders,
    allUsers,
    updateorderstatus

}