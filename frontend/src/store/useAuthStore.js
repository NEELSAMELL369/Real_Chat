// src/store/useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  loading: false,
  isCheckingAuth: false,

  signup: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("✅ Signup response:", res.data);
      set({ authUser: res.data }); // directly use res.data
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      set({ loading: false });
    }
  },

  // src/store/useAuthStore.js (snippet)
  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("✅ Login response:", res.data);
      set({ authUser: res.data }); // res.data is the user object
      toast.success("Logged in successfully!");
      return res.data; // <-- return user (truthy)
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Login failed");
      return null; // <-- failure
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Logout failed!");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("✅ checkAuth response:", res.data);
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
