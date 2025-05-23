import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || ".env" });
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


 
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.listen(7000, () => {
  console.log("server running on localhost:7000");
}); 