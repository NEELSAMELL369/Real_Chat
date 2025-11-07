import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://real-chat-n6ob.onrender.com", // deployed backend
  withCredentials: true, // important for cookies
});
