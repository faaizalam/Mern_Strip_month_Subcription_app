import express from 'express'
import expressAsyncHandler from "express-async-handler";
import Articals from '../models/Artical.js';
import User from '../models/user.js';
// import User from '../models/user.js';
import Strip from 'stripe'


const articalsroute=express.Router();
// imageUrl: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   access:

articalsroute.post('/postman/artical',expressAsyncHandler(async(req,res)=>{
    const data={
        title:req.body.title,
        imageUrl:'/images/logo192.png',
        content:req.body.content,
        access:req.body.access
    }
    console.log(data)
    // console.log(data)
  const userrouter=new Articals(data)
    const savedata=await userrouter.save()
    res.send(savedata)



}))

const stripe=new Strip(process.env.Secret_key_stripe,{apiVersion:"2022-08-01"})
articalsroute.post('/postman/subsend',expressAsyncHandler(async(req,res)=>{
   console.log(req.body.email)
  const userexit=await User.findOne({email:req.body.email})
  if (!userexit) {
    res.status(404).send({message:"no subscription found kindly check email or contact provider"})
    return
    
  }

  const sendssre=await stripe.subscriptions.list({
    customer:userexit.stripuser,
    status:'all',
    expand:["data.default_payment_method"]
  },
  {
    apiKey:process.env.Secret_key_stripe
  })
   if (!sendssre.data.length) {
    res.status(404).send({message:'no subscription'})
    return
    
   }

   const plan=sendssre.data[0].plan.nickname
   if (plan==='Basic') {
    const basic=await Articals.find({access:"Basic"})
    res.send(basic)
    
   }else if(plan==='Standard'){
    const stand=await Articals.find({access:{$in:['Basic'&&'Standard']}})
    res.send(stand)
   }else{
    const Premiumss=await Articals.find({})
    res.send(Premiumss)
   }
  //  res.send(plan)
}))



export default articalsroute