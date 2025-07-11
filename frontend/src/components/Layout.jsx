import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-black text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Property Registeration System</h1>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="properties" className="hover:text-gray-300">Properties</Link>
            <Link to="about" className="hover:text-gray-300">About</Link>
            <Link to="register" className="hover:text-gray-300">Register</Link>
            <Link to="login" className="hover:text-gray-300">Login</Link>
            <Link to="dashboard" className="hover:text-gray-300">Dashboard</Link>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto p-6">
        {children}
      </main>

      <footer className="bg-black text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Property Registeration System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
