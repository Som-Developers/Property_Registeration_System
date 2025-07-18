import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminLayout from "./components/layout.jsx/AdminLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Register from "./components/Register";
import ForgotPassword from "./pages/auth/ForgorPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Login is the default page */}
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Index />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* ✅ Admin dashboard wrapped in AdminLayout */}
        <Route path="/admin-dashboard" element={
            <AdminDashboard />
        } />

        {/* Optional: If you want to wrap regular pages under AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
