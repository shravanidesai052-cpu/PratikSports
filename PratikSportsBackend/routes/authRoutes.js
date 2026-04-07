import express from "express";
import {register,login,getUserByMobile,updateUserProfile,resetPassword} from "../controllers/authController.js";
const router = express.Router();


// User registration
router.post("/register", register);
// User login
router.post("/login", login);
// Password reset
router.put("/reset-password", resetPassword);

router.get("/user/:mobile", getUserByMobile);
router.put("/user/:mobile", updateUserProfile);

export default router;