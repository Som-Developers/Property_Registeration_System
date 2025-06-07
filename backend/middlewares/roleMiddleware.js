const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      // Get token from headers
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // Check if user's role matches allowed roles
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }

      // Attach user to request
      req.user = user;

      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = roleMiddleware;
