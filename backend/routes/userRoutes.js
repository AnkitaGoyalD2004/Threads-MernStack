import express from "express";
import { followUnFollowUser, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:username" , getUserProfile)
router.post("/signup" , signupUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.post("/follow/:id" , protectRoute ,followUnFollowUser) //// protectRoute is a middleware
//:id: This is a placeholder for a dynamic value that will be provided by the client in the URL. 
router.put("/update/:id" , protectRoute ,updateUser)

export default router;
