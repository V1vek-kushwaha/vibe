import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("DB connected")
    } catch (error) {
        console.log("error in db connection",error)
    }
}

export default connectDb