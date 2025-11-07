import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

// Parse JSON and cookies
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// Enable CORS for your deployed frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://real-chat-ggkyn85zt-neel-samels-projects.vercel.app",
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
