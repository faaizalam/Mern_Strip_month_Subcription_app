import mongoose from "mongoose";


const ArticalSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      access: {
        type: String,
        enum: ["Basic", "Standard", "Premium"],
        required: true,
      },




})


const Articals=mongoose.model('Articals',ArticalSchema)
export default Articals