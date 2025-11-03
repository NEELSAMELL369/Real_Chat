import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import https from "https";
import path from "path";
import connectdb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(cookieParser());

// ✅ Secure CORS setup
app.use(cors({origin: process.env.CLIENT_URL || "http://localhost:5173",credentials: true,}));

// ✅ Serve local uploads only in dev
const __dirname = path.resolve();
if (process.env.NODE_ENV === "development") {
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
}

// ===== Routes =====
app.use("/api/auth", authRoutes);

// ===== Server =====
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await connectdb();

    if (process.env.NODE_ENV === "development" && process.env.USE_LOCAL_SSL === "true") {
      // ✅ Use local SSL cert for dev HTTPS
      const key = fs.readFileSync(process.env.SSL_KEY);
      const cert = fs.readFileSync(process.env.SSL_CERT);

      https.createServer({ key, cert }, app).listen(PORT, () => {
        console.log(`🔒 HTTPS Dev Server running at https://localhost:${PORT}`);
      });
    } else {
      // ✅ Default HTTP server (works both locally & production)
      app.listen(PORT, () => {
        console.log(`🚀 HTTP Server running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error(`❌ Server start failed: ${error.message}`);
  }
};

startServer();
