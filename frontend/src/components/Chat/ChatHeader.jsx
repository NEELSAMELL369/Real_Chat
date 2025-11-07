// src/components/Chat/ChatHeader.jsx
import React from "react";
import { useChatStore } from "../../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();
  if (!selectedUser) {
    return (
      <div className="p-4 border-b border-gray-700 bg-gray-900">
        <div className="text-gray-400">Select a chat to start messaging</div>
      </div>
    );
  }

  const isOnline = onlineUsers.includes(String(selectedUser._id));

  return (
    <div className="p-4 border-b border-gray-700 bg-gray-900 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePic || "/avatar-placeholder.png"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{selectedUser.fullName}</div>
          <div className="text-sm text-gray-400">{isOnline ? "Online" : "Offline"}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
