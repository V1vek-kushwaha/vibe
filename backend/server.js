import { configDotenv } from "dotenv"
import express from "express"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"


const app = express()
configDotenv()
connectDb();
const port = process.env.PORT || 5000
app.use(cors({
    origin: "*",
    credentials: true

}))
app.use(express.json());
app.use(cookieParser())




app.get("/", (req, res) => {
    res.send("hello dev")
})

app.use("/api/v1", authRouter)
app.use("/api/v1", userRouter)


app.listen(port, () => {
    console.log(`server up port ${port}`)
})

