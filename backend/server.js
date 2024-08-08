import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.listen(3000 , ()=> console.log(`server started at port ${PORT}`))