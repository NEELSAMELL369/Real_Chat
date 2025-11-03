// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// 🧩 Load Cloudinary credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Check configuration status
const verifyCloudinaryConfig = async () => {
  try {
    // Ensure all env vars are present
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.warn("⚠️ Missing Cloudinary credentials in .env file");
      return false;
    }

    // Try listing a folder (simple ping test)
    const result = await cloudinary.api.ping();
    console.log("☁️ Cloudinary Connected:", result.status);
    return true;
  } catch (error) {
    console.error("❌ Cloudinary Connection Failed:", error.message);
    return false;
  }
};

// Immediately run check when file is imported
verifyCloudinaryConfig();

export default cloudinary;
