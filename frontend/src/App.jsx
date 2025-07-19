import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import AdminLayout from "./components/layout.jsx/AdminLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Register from "./components/Register";
import ForgotPassword from "./pages/auth/ForgorPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Index from "./pages/Index";
import Login from "./components/Login";
import RegisterProperty from "./pages/RegisterProperty";
import OwnerRegistrationPage from "./pages/OwnerRegistrationPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PropertyTypeView from './view/propertyType/Index';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<PropertyTypeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/register-property" element={<RegisterProperty />} />
          <Route path="/owner-registration" element={<OwnerRegistrationPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="properties" element={<Properties />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
