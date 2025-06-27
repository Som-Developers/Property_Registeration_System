import React from 'react';

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Property Registeration System</h1>
      <p className="text-xl text-gray-600 mb-8">
        Find and register your dream property easily
      </p>
      <div className="space-y-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Register Property
        </button>
        <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
          Search Properties
        </button>
      </div>
    </div>
  );
};

export default Home;
