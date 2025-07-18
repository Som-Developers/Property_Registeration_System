
import React from 'react';
import { Bell, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const NotificationsPanel = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Property Approved',
      message: 'Property #PR-2024-001 has been successfully approved.',
      time: '2 hours ago',
      icon: CheckCircle,
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Required',
      message: 'Additional documentation needed for Property #PR-2024-002.',
      time: '4 hours ago',
      icon: AlertCircle,
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features added to the property search functionality.',
      time: '1 day ago',
      icon: Info,
    },
    {
      id: 4,
      type: 'success',
      title: 'Registration Complete',
      message: 'Your owner registration has been processed successfully.',
      time: '2 days ago',
      icon: CheckCircle,
    },
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center min-w-0">
          <Bell size={20} className="text-blue-600 mr-2 flex-shrink-0 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Recent Notifications</h2>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium flex-shrink-0 ml-2">
          View All
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 p-3 sm:p-4 rounded-r-lg ${getNotificationStyle(notification.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start min-w-0 flex-1">
                <notification.icon
                  size={16}
                  className={`mr-2 sm:mr-3 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5 ${getIconColor(notification.type)}`}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 truncate">
                    {notification.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-2 p-1">
                <X size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;
