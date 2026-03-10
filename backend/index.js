import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import aiRouter from './routes/aiRoute.js';
let port = process.env.PORT || 6000

let app = express()
app.set("trust proxy", 1) // ✅ Needed on Render

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001", "http://localhost:5174"], // Local ports
 credentials: true
}))

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/ai",aiRouter)

// ✅ Add root route
app.get("/", (req, res) => {
  res.send("✅ DoShopAI backend is running!");
})




app.listen(port,()=>{
    console.log("Hello From Server")
    connectDb()
})


