import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async( req , res , next) => {
try{
const token = req.cookies.jwt;

if(!token) return res.status(401).json({message : "Unauthorized"});

const decode  = jwt.verify(token , process.env.JWT_SECRET);
const user = await User.findById(decode.userId).select("-password");
//When you use a hyphen (-) before a field name, it tells Mongoose to exclude that field from the results.
req.user = user;



next();

}catch(error){
    res.status(500).json({message: error.message});
  console.log("Error in  Route :" , error.message)
}
}
export default protectRoute;