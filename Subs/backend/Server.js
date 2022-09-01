import express from 'express'


import mongoose from 'mongoose';
import articalsroute from './Routes/Articals.js';
import Striprouter from './Routes/Strip.js';
import userRouter from './Routes/User.js';
import dotenv from 'dotenv'
import cors from  'cors'






const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())
dotenv.config()
// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost/subcription', {
    useNewUrlParser: true,
    
}).then(()=>{
    console.log("working")
}).catch((error)=>{
    console.log(error)
})

const port = 5000
app.use((err,res,req,next)=>{
    res.send({message:err.message})
    
})
app.use('/',userRouter)
app.use('/',articalsroute)
app.use('/',Striprouter)



app.get('/postman/user', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))