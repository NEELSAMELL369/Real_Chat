// src/lib/socket.js
import { io } from "socket.io-client";

const BASE = import.meta.env.MODE === "development"
  ? "http://localhost:8080"
  : window.location.origin;

let socket = null;

export const initSocket = (userId) => {
  if (socket && socket.connected) return socket;
  socket = io(BASE, {
    autoConnect: false,
    withCredentials: true,
    query: { userId },
  });
  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
