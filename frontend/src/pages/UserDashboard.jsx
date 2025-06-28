import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const UserDashboard = () => {
  return (
    <DashboardLayout role="user">
      <h1 className="text-3xl font-bold text-green-700 mb-4">User Dashboard</h1>
      <p>Welcome! Use the sidebar to manage your profile and properties.</p>
    </DashboardLayout>
  );
};

export default UserDashboard;
