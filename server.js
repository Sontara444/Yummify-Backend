import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import 'dotenv/config'

import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";

const app = express();

const PORT = process.env.PORT || 4000;

connectDB()
const allowedOrigins = ['http://localhost:3000']

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true}))
app.use(express.json());
app.use(cookieParser())


// routes
app.get("/", (req, res) => {res.send("working")})
  
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)



app.listen(PORT, () => console.log(`server Running on port ${PORT}`));
