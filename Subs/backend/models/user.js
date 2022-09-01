import mongoose from "mongoose";


const userSchme=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    stripuser:{type:String}
})

const User= mongoose.model("User",userSchme)
export default User;