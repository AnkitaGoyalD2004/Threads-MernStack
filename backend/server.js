import { v2 as cloudinary } from "cloudinary";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from "express";
import connectDB from './db/connectDB.js';
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
const PORT = 4500;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET , 
})

//middleware , These two lines set up middleware in an Express.js application to handle incoming request data.
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(cookieParser());

//Routes
app.use("/api/users" , userRoutes);
app.use("/api/posts" , postRoutes);

app.listen(4500 , ()=> console.log(`server started at port ${PORT}`))





//middleware -> 
//1. app.use(express.json())
//Parses incoming requests with JSON payloads
//Allows you to access the parsed data via req.body for requests with Content-Type: application/json