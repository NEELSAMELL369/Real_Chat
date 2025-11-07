// src/store/useChatStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { getSocket } from "../lib/socket";

export const useChatStore = create((set, get) => ({
  users: [],
  onlineUsers: [],
  selectedUser: null,
  messages: [],
  loadingUsers: false,
  loadingMessages: false,

  fetchUsers: async () => {
    set({ loadingUsers: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data || [] });
    } catch (err) {
      console.error("fetchUsers:", err);
    } finally {
      set({ loadingUsers: false });
    }
  },

  fetchMessages: async (userId) => {
    set({ loadingMessages: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] });
    } catch (err) {
      console.error("fetchMessages:", err);
    } finally {
      set({ loadingMessages: false });
    }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user, messages: [] });
    get().fetchMessages(user._id);
  },

  sendMessage: async (text) => {
    const { selectedUser, messages } = get();
    if (!selectedUser || !text?.trim()) return;
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
        text,
      });
      // Append locally
      set({ messages: [...messages, res.data] });

      // Emit via socket
      const socket = getSocket();
      if (socket && socket.connected) socket.emit("send-message", res.data);
    } catch (err) {
      console.error("sendMessage:", err);
    }
  },

  receiveMessage: (msg) => {
    const { selectedUser, messages } = get();
    // if message is from currently selected user, append
    const otherId = msg.senderId || msg.sender; // support different shapes
    if (selectedUser && String(otherId) === String(selectedUser._id)) {
      set({ messages: [...messages, msg] });
    } else {
      // optionally: mark unread count, refresh users etc.
      // we'll refresh users list so UI can show new message preview
      get().fetchUsers();
    }
  },

  setOnlineUsers: (arr) => set({ onlineUsers: arr || [] }),
}));
