import express from 'express'
import expressAsyncHandler from "express-async-handler";
import Articals from '../models/Artical.js';
import User from '../models/user.js';
import Strip from 'stripe'


// import User from '../models/user.js';


const Striprouter=express.Router();
const stripe = new Strip(process.env.Secret_key_stripe,{apiVersion:"2022-08-01"})
Striprouter.get('/postman/prices',expressAsyncHandler(async(req,res)=>{

        const resprice= await stripe.prices.list({
            apiKey:process.env.Secret_key_stripe
        })
        // console.log(resprice)
            
            if (resprice.data) {
                
                res.send(resprice.data)
            }else{
                res.send({message:"connection problem"})
            }
   
// const resprice={
//     data:{
//         nickname:f
//     }
// }

}))

Striprouter.post('/postman/session',expressAsyncHandler(async(req,res)=>{
    const userstripid=await User.findOne({email:req.body.email})
    console.log(req.body.email)
    if (userstripid) {
  console.log("gyes",userstripid.stripuser)       
    }
    const sessionres=await stripe.checkout.sessions.create({
        mode:'subscription',
        payment_method_types:['card'],
        line_items:[
            {
                price:req.body.price,
                quantity:1
            }
        ],
        success_url:`http://localhost:3000/Artical-plan`,
        cancel_url:'http://localhost:3000/Artical',
        customer:userstripid.stripuser
    },
    {
        apiKey:process.env.Secret_key_stripe
    }
    )
    res.send(sessionres)
}))

export default Striprouter