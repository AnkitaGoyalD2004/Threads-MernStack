import express from "express";
import { followUnFollowUser, loginUser, logoutUser, signupUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup" , signupUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.post("/follow/:id" , protectRoute ,followUnFollowUser) //// protectRoute is a middleware
//:id: This is a placeholder for a dynamic value that will be provided by the client in the URL. 

export default router;
