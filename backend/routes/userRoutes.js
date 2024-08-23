import express from "express";
import { followUnFollowUser, loginUser, logoutUser, signupUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup" , signupUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.post("/follow" , followUnFollowUser)

export default router;
