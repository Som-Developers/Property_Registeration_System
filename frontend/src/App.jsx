import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import About from "./pages/About";
import Register from "./components/Register";
import ForgotPassword from "./pages/auth/ForgorPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
