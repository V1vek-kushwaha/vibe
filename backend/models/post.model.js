import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    auther:{
        type:String,
        require:true,
        
    },
     mediaType:{
        type:String,
        enum:["image","video"]
        
    }
})