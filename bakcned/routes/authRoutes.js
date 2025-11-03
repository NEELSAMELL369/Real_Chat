import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", upload.single("profile_pic"), registerUser); // ✅ multer added
router.post("/login", loginUser);

// Protected routes
router.post("/logout", protect, logoutUser);
router.put("/update", protect, upload.single("profile_pic"), updateUserProfile);

export default router;
