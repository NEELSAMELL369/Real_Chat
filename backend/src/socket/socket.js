import http from "http";
import { Server } from "socket.io";
import app from "../app.js";

/* create server from express app */
const server = http.createServer(app);

/* io with CORS allowing frontend */
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
    credentials: true,
  },
});

/* map userId -> socketId */
const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (userId) => userSocketMap[userId];
export { io, server };

/* socket handlers */
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // getting userId from client via query param
  const userId = socket.handshake.query?.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // send online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("send-message", (msg) => {
    const receiverSocketId = userSocketMap[msg.receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
