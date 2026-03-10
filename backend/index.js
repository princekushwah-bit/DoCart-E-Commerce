import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import aiRouter from './routes/aiRoute.js';

dotenv.config()

const port = process.env.PORT || 6000
const app = express()

app.set("trust proxy", 1) 


app.use(cors({
 origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:3001", "http://localhost:5174", "https://do-cart-e-commerce.vercel.app","https://do-cart-e-commerce-9gqk.vercel.app"], 
 credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/ai", aiRouter)

app.get("/", (req, res) => {
  res.send("✅ DoShopAI backend is running!");
})


const startServer = async () => {
    try {
        await connectDb(); 
        console.log("DB connected successfully");
        
        app.listen(port, "0.0.0.0", () => {
            console.log(`Hello From Server! Running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to DB:", error);
        process.exit(1);
    }
}

startServer();
