import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from "express";
import connectDB from './db/connectDB.js';
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//middleware , These two lines set up middleware in an Express.js application to handle incoming request data.
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(cookieParser());

//Routes
app.use("/api/users" , userRoutes)

app.listen(3000 , ()=> console.log(`server started at port ${PORT}`))





//middleware -> 
//1. app.use(express.json())
//Parses incoming requests with JSON payloads
//Allows you to access the parsed data via req.body for requests with Content-Type: application/json