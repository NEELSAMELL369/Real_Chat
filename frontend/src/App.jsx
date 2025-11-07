// App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { authUser, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth(); // fetch session once
  }, []);

  if (loading) return <div>Checking session...</div>;

  return (
    <BrowserRouter>
      {authUser && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
