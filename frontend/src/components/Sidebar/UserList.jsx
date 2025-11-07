// src/components/Sidebar/UserList.jsx
import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const UserItem = ({ user, onClick, isSelected, isOnline }) => (
  <li
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
      isSelected ? "bg-gray-800" : "hover:bg-gray-800/50"
    }`}
  >
    <img
      src={user.profilePic || "/avatar-placeholder.png"}
      alt={user.fullName}
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <span className="font-medium">{user.fullName}</span>
        {isOnline && <span className="text-xs text-green-400">●</span>}
      </div>
      <div className="text-sm text-gray-400 truncate">{user.email}</div>
    </div>
  </li>
);

const UserList = () => {
  const { fetchUsers, users, selectedUser, setSelectedUser, onlineUsers } = useChatStore();
  const { user: me } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <aside className="w-80 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Chats</h2>
        <p className="text-sm text-gray-400">{users.length} contacts</p>
      </div>

      <ul className="space-y-2 overflow-auto">
        {users.map((u) => (
          <UserItem
            key={u._id}
            user={u}
            onClick={() => setSelectedUser(u)}
            isSelected={selectedUser?._id === u._id}
            isOnline={onlineUsers.includes(String(u._id))}
          />
        ))}

        {users.length === 0 && (
          <li className="text-sm text-gray-400">No users found</li>
        )}
      </ul>

      <div className="mt-auto text-xs text-gray-500">
        Signed in as <span className="text-white ml-1">{me?.fullName}</span>
      </div>
    </aside>
  );
};

export default UserList;
