import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import PropertyTypeView from './view/propertyType/Index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/property-types" element={<PropertyTypeView />} />
      </Routes>
    </Router>
  );
}

export default App;
