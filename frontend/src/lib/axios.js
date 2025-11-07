import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://real-chat-n6ob.onrender.com/api", // deployed backend
  withCredentials: true, // important for cookies
});
