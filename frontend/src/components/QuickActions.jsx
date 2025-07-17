
import React from 'react';
import { Plus, Search, FileText, Users } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Register New Property',
      description: 'Add a new property to the system',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: '/register-property',
    },
    {
      title: 'Search Properties',
      description: 'Find existing properties',
      icon: Search,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/search-properties',
    },
    {
      title: 'Generate Report',
      description: 'Create property reports',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      href: '/reports',
    },
    {
      title: 'Manage Owners',
      description: 'Owner registration & management',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      href: '/owner-registration',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 sm:p-6 rounded-lg transition-colors duration-200 text-left group w-full`}
            onClick={() => console.log(`Navigate to ${action.href}`)}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <action.icon size={20} className="mr-2 sm:mr-3 flex-shrink-0 sm:w-6 sm:h-6" />
              <h3 className="text-sm sm:text-lg font-semibold truncate">{action.title}</h3>
            </div>
            <p className="text-xs sm:text-sm opacity-90 line-clamp-2">{action.description}</p>
            <div className="mt-2 sm:mt-4 inline-flex items-center text-xs sm:text-sm font-medium">
              Get Started
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;