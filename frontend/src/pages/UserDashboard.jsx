import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import OverviewCards from '../components/OverviewCards';
import NotificationsPanel from '../components/NotificationPanel';
import QuickActions from '../components/QuickActions';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="relative flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-600 hover:text-gray-900 mr-3 sm:mr-4 p-1"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Welcome back! Here's your property overview.</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Property Administrator</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Overview Cards */}
          <OverviewCards />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-8">
              <QuickActions />
            </div>

            {/* Notifications Panel */}
            <div className="lg:col-span-4">
              <NotificationsPanel />
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Recent Activity</h2>
            <div className="space-y-3 sm:space-y-4">
              {[
                { action: 'Property registered', property: 'PR-2024-001', time: '2 hours ago', status: 'success' },
                { action: 'Document uploaded', property: 'PR-2024-002', time: '4 hours ago', status: 'info' },
                { action: 'Approval pending', property: 'PR-2024-003', time: '6 hours ago', status: 'warning' },
                { action: 'Property approved', property: 'PR-2024-004', time: '1 day ago', status: 'success' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full mr-3 sm:mr-4 flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.property}</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
