
import React from 'react';
import { Building, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const OverviewCards = () => {
  const cards = [
    {
      title: 'Total Properties Registered',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: Building,
      color: 'bg-blue-500',
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '-8%',
      changeType: 'negative',
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      title: 'Approved Properties',
      value: '1,189',
      change: '+15%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Monthly Growth',
      value: '8.5%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                {card.title}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {card.value}
              </p>
              <div className="flex items-center">
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    card.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {card.change}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1 truncate">vs last month</span>
              </div>
            </div>
            <div className={`${card.color} p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2`}>
              <card.icon size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;