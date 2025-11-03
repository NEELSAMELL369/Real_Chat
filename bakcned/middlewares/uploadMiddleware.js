import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload directory if not exists
const uploadPath = path.resolve("uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  // where to save file temporarily
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  // how to name file
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Check allowed file types
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExt = [".jpg", ".jpeg", ".png"];

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Only .jpg, .jpeg, .png files are allowed"), false);
  }
  cb(null, true);
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
