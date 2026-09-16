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
import messageRoutes from "./routes/messageRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

import path from "path";

dotenv.config();

connectDB();

const __dirname = path.resolve();

const PORT = process.env.PORT || 4500; 
// Custom CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === "production" ? true : "http://localhost:3000",
    credentials: true,
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
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start server
server.listen(PORT, () => console.log(`Server started at http:localhost:${PORT}`));