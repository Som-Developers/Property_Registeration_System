const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🧪 Decoded from token:", decoded); // 👈 log it

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("verifyToken error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { verifyToken };
