// src/components/Chat/MessageInput.jsx
import React, { useState } from "react";
import { useChatStore } from "../../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await sendMessage(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-900 flex items-center gap-3">
      <input
        type="text"
        placeholder={selectedUser ? `Message ${selectedUser.fullName}...` : "Select a user to message"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!selectedUser}
        className="flex-1 p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 outline-none"
      />
      <button
        type="submit"
        disabled={!selectedUser || !text.trim()}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
