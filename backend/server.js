import dotenv from 'dotenv';
import express from "express";
import connectDB from './db/connectDB.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;


app.listen(3000 , ()=> console.log(`server started at port ${PORT}`))