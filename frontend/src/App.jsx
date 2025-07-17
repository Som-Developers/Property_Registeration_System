import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Register from './components/Register';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />

        {/* <Route path="/" element={<UserDashboard />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
