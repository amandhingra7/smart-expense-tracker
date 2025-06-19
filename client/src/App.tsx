import React, { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Home from "./Home.tsx";

const PrivateRoute = ({ children }: { children: JSX.Element }) =>
  localStorage.getItem("token") ? children : <Navigate to="/login" replace />;

const PublicRoute = ({ children }: { children: JSX.Element }) =>
  localStorage.getItem("token") ? <Navigate to="/" replace /> : children;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
