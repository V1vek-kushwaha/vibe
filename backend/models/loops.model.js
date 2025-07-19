import mongoose from "mongoose";

const loopsSchema = new mongoose.Schema({
     auther: {
    
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: true,
    
        },      
        media: {
            type: String,
            require: true,
        },
        captions: {
            type: String,
    
        },
        likes: [
    
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            }
    
        ],
         comments: [
    
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            }
    
        ],
        
        
    
    
},{timestamps:true})

const Loops = mongoose.model("Loops",loopsSchema)

export default Loops
