// src/pages/Chat.jsx
import React, { useEffect } from "react";
import UserList from "../components/Sidebar/UserList";
import ChatHeader from "../components/Chat/ChatHeader";
import MessageList from "../components/Chat/MessageList";
import MessageInput from "../components/Chat/MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { initSocket, getSocket } from "../lib/socket";
import { useChatStore } from "../store/useChatStore";

const Chat = () => {
  const { user } = useAuthStore();
  const { setOnlineUsers, receiveMessage, fetchUsers } = useChatStore();

  useEffect(() => {
    if (!user?._id) return;

    // init socket with userId
    const socket = initSocket(user._id);

    socket.connect();

    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.on("receive-message", (msg) => {
      receiveMessage(msg);
    });

    socket.on("getOnlineUsers", (arr) => {
      setOnlineUsers(arr || []);
    });

    // optional: ask server for online users or refresh users
    fetchUsers();

    return () => {
      socket.off("receive-message");
      socket.off("getOnlineUsers");
      // don't disconnect completely if you want session persistence, but we can
      // socket.disconnect();
    };
  }, [user?._id]);

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <UserList />
      <div className="flex flex-col flex-1 border-l border-gray-700">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
