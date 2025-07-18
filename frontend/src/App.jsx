import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import PropertyTypeView from './view/propertyType/Index';
import Properties from './pages/Properties';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyTypeView />} />
      </Routes>        {/* <Route path="/" element={<AdminDashboard />} /> */}

    </Router>
  );
}

export default App;
