import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux" // Add Redux Provider
import { store } from "./redux/store" // Import your store
import AdminLayout from "./components/layout.jsx/AdminLayout"
import Home from "./pages/Home"
import Properties from "./pages/Properties"
import About from "./pages/About"
import Register from "./components/Register"
import ForgotPassword from "./pages/auth/ForgorPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import Index from "./pages/Index"
import Login from "./components/Login"
import RegisterProperty from "./pages/RegisterProperty" // Fixed import name
import OwnerRegistrationPage from "./pages/OwnerRegistrationPage" // <-- Import the page

import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/AdminDashboard"

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap with Redux Provider */}
      <Router>
        <Routes>
          {/* ✅ Login is the default page */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* ✅ Property Registration Route */}
          <Route path="/register-property" element={<RegisterProperty />} />
          <Route path="/owner-registration" element={<OwnerRegistrationPage />} />


          {/* ✅ Admin dashboard wrapped in AdminLayout */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Optional: If you want to wrap regular pages under AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="properties" element={<Properties />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
