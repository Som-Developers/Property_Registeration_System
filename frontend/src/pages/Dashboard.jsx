// src/pages/Dashboard.jsx
import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  let user = null;
  try {
    const userString = localStorage.getItem('user');
    user = userString ? JSON.parse(userString) : null;
  } catch (err) {
    console.error("❌ Failed to parse user:", err);
    return <p className="text-center text-red-500 mt-10">Invalid user data. Please log in again.</p>;
  }

  if (!user) {
    return <p className="text-center text-red-500 mt-10">Unauthorized. Please log in.</p>;
  }

  console.log("🟢 Parsed User:", user); // ✅ Debug log

  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else if (user.role === 'user') {
    return <UserDashboard />;
  } else {
    return <p className="text-center text-yellow-600 mt-10">Unknown role: {user.role}</p>;
  }
};

export default Dashboard;
