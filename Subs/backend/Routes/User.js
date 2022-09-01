import  express  from "express";
import User from "../models/user.js";
import Stripe from "stripe";

const userRouter=express.Router()
import expressAsyncHandler from 'express-async-handler';
  const stripe=new Stripe(process.env.Secret_key_stripe,{apiVersion:"2022-08-01"})

userRouter.post('/postman/signup',expressAsyncHandler(async(req,res)=>{
    const userexit=await User.findOne({email:req.body.email})
    if (userexit) {
        res.send({message:"user already exit"})
        return
        
    }else{
        const newstrip=await stripe.customers.create({
            
            email:req.body.email
        },{
            apiKey:process.env.Secret_key_stripe
        })
    
    const data={
        email:req.body.email,
        password:req.body.password,
        stripuser:newstrip.id
    }
    const userlogin=new User(data)
      const savinguser= await userlogin.save()
      if (savinguser) {
        
          res.send(savinguser)
      }else{
        res.status(404).send({message:"no registred"})
      }
    }
   
 }))

userRouter.post('/postman/login',expressAsyncHandler(async(req,res)=>{
   const userresponse=await User.findOne({email:req.body.email})
//    console.log(userresponse)
   console.log(req.body.email)
   console.log(req.body.password)
   if (userresponse) {
    if (userresponse.password===req.body.password) {
        
        res.send(userresponse)
    
    }else{
        res.status(401).send({message:"password or email inccorect"})
    }
    
   }else{
    res.status(404).send({message:"user not found"})
   }

}))

export default userRouter