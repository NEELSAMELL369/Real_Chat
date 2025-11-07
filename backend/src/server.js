import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { server } from "./socket/socket.js";
import app from "./app.js";

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
})();
