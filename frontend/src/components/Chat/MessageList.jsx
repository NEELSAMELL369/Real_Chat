// src/components/Chat/MessageList.jsx
import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const MessageItem = ({ msg, mine }) => (
  <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[65%] px-4 py-2 rounded-2xl break-words ${
        mine
          ? "bg-blue-500 text-white rounded-br-none"
          : "bg-gray-700 text-gray-100 rounded-bl-none"
      }`}
    >
      {!mine && <div className="font-semibold mb-1">{msg.senderName}</div>}
      <div>{msg.text}</div>
      {msg.image && (
        <img
          src={msg.image}
          alt="attachment"
          className="mt-2 rounded-md max-h-48 object-cover"
        />
      )}
      <div className="text-xs text-gray-300 mt-1 text-right">
        {new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  </div>
);

const MessageList = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser: me } = useAuthStore();
  const bottomRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a user to view messages
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-900">
      {messages.map((m) => {
        const mine = me && String(m.senderId) === String(me._id);
        return <MessageItem key={m._id || m.createdAt} msg={m} mine={mine} />;
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
