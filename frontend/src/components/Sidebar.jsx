import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-5 space-y-4">
      <h2 className="text-xl font-bold mb-6">
        {role === 'admin' ? 'Admin Panel' : 'User Panel'}
      </h2>

      {role === 'admin' ? (
        <>
          <Link to="/admin/properties" className="block hover:text-blue-300">Manage Properties</Link>
          <Link to="/admin/property-types" className="block hover:text-blue-300">Property Types</Link>
          <Link to="/admin/users" className="block hover:text-blue-300">Manage Users</Link>
          <Link to="/admin/owners" className="block hover:text-blue-300">Manage Owners</Link>
        </>
      ) : (
        <>
          <Link to="/my-properties" className="block hover:text-blue-300">My Properties</Link>
          <Link to="/register-owner" className="block hover:text-blue-300">Register as Owner</Link>
          <Link to="/profile" className="block hover:text-blue-300">Update Profile</Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
