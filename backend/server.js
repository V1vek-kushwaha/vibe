import { configDotenv } from "dotenv"
import express from "express"
import connectDb from "./config/db.js"
const app = express()
configDotenv()
connectDb();
const port = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("hello dev")
})

app.listen(port,()=>{
    console.log(`server up port ${port}`)
})

