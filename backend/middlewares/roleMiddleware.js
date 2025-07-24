const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      // Get token from headers
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        console.log('No authorization header found');
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        console.log('No token found in authorization header');
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
      } catch (jwtError) {
        console.error('JWT verification failed:', jwtError);
        return res.status(401).json({ 
          message: "Unauthorized: Invalid token",
          error: jwtError.message 
        });
      }

      // Find user
      const user = await User.findById(decoded.userId || decoded.id);
      if (!user) {
        console.log('User not found for ID:', decoded.userId || decoded.id);
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      console.log('User found:', user.email, 'Role:', user.role);

      // Check if user's role matches allowed roles
      if (!roles.includes(user.role)) {
        console.log('Insufficient permissions. User role:', user.role, 'Allowed roles:', roles);
        return res.status(403).json({ 
          message: "Forbidden: Insufficient permissions",
          requiredRoles: roles,
          userRole: user.role
        });
      }

      // Attach user to request
      req.user = {
        id: user._id,
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.username
      };

      console.log('User attached to request:', req.user);
      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = {roleMiddleware};
