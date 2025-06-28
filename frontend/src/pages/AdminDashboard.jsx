import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Use the sidebar to manage properties, users, and more.</p>
    </DashboardLayout>
  );
};

export default AdminDashboard;
