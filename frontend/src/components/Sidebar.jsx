// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ role }) => {
//   return (
//     <div className="w-64 bg-gray-900 text-white min-h-screen p-5 space-y-4">
//       <h2 className="text-xl font-bold mb-6">
//         {role === 'admin' ? 'Admin Panel' : 'User Panel'}
//       </h2>

//       {role === 'admin' ? (
//         <>
//           <Link to="/admin/properties" className="block hover:text-blue-300">Manage Properties</Link>
//           <Link to="/admin/property-types" className="block hover:text-blue-300">Property Types</Link>
//           <Link to="/admin/users" className="block hover:text-blue-300">Manage Users</Link>
//           <Link to="/admin/owners" className="block hover:text-blue-300">Manage Owners</Link>
//         </>
//       ) : (
//         <>
//           <Link to="/my-properties" className="block hover:text-blue-300">My Properties</Link>
//           <Link to="/register-owner" className="block hover:text-blue-300">Register as Owner</Link>
//           <Link to="/profile" className="block hover:text-blue-300">Update Profile</Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default Sidebar;



import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Plus, 
  Building, 
  UserPlus, 
  Search, 
  Bell, 
  User,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Property Types', path: '/property-types', icon: Plus },
    { name: 'Register Property', path: '/register-property', icon: Plus },
    { name: 'My Properties', path: '/my-properties', icon: Building },
    { name: 'Owner Registration', path: '/owner-registration', icon: UserPlus },
    { name: 'Search Properties', path: '/search-properties', icon: Search },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        flex flex-col
        absolute left-0 top-0 z-40 h-full w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-700">
          <h1 className="text-lg sm:text-xl font-bold text-white">PropertyReg</h1>
          <button
            onClick={onToggle}
            className="lg:hidden text-white hover:text-gray-300 p-1"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-4 sm:mt-6 px-2 sm:px-0">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => {
                // Close sidebar on mobile when navigating
                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={({ isActive }) =>
                `flex items-center px-4 sm:px-6 py-3 text-gray-300 hover:bg-slate-800 hover:text-white transition-colors ${
                  isActive ? 'bg-blue-600 text-white border-r-4 border-blue-400' : ''
                }`
              }
            >
              <item.icon size={20} className="mr-3 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-700">
          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Property Registration System v1.0
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
