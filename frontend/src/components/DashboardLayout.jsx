import React from 'react';

const DashboardLayout = ({ role, children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">
          {role === 'admin' ? 'Admin Menu' : 'User Menu'}
        </h2>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600">Dashboard</a></li>
          <li><a href="#" className="text-blue-600">Properties</a></li>
          <li><a href="#" className="text-blue-600">Profile</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
