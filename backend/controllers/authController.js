import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

// ✅ Signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user first (without profile pic)
    const user = await User.create({ name, email, password: hashedPassword });

    // Upload to Cloudinary if file present
    if (req.file) {
    
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_pic",
          width: 150,
          crop: "scale",
        });
        user.profile_pic = result.secure_url;
        await user.save();
      } catch (uploadErr) {
        console.error("Cloudinary upload failed:", uploadErr);
      } finally {
        // Remove local temp file after upload
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });
      }
    }

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
    });
    
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Logout
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

// ✅ Update Profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.profile_pic = req.body.profile_pic || user.profile_pic;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profile_pic: updatedUser.profile_pic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
