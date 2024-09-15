// import { v2 as cloudinary } from "cloudinary";
// import cookieParser from 'cookie-parser';
// import dotenv from 'dotenv';
// import express from "express";
// import connectDB from './db/connectDB.js';
// import postRoutes from "./routes/postRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// dotenv.config();
// connectDB();
// const app = express();
// const PORT = 4500;

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
//     api_key : process.env.CLOUDINARY_API_KEY,
//     api_secret : process.env.CLOUDINARY_API_SECRET , 
// })

// //middleware , These two lines set up middleware in an Express.js application to handle incoming request data.
// app.use(express.json({ limit: "50mb" }))
// app.use(express.urlencoded({extended: true})) 
// app.use(cookieParser());

// //Routes
// app.use("/api/users" , userRoutes);
// app.use("/api/posts" , postRoutes);

// app.listen(4500 , ()=> console.log(`server started at port ${PORT}`))





// //middleware -> 
// //1. app.use(express.json())
// //Parses incoming requests with JSON payloads
// //Allows you to access the parsed data via req.body for requests with Content-Type: application/json


import { v2 as cloudinary } from "cloudinary";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import connectDB from './db/connectDB.js';
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 4500;

// Custom CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "Token"], // Allowed headers
  };
  
  // Enable CORS with custom configuration
  app.use(cors(corsOptions));



// Cloudinary configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
