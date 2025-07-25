const express = require("express");
const {
  registerUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUserRole,
} = require("../controller/authConroller");

const { registerUserMiddleware } = require("../middlewares/userMiddlewares");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const { verifyToken } = require("../middlewares/verifyToken");
const User = require("../models/userModel");

const router = express.Router();

// Public routes
router.post("/register", registerUserMiddleware, registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Place this BEFORE any dynamic `/:id` routes
router.get("/me", verifyToken, async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user.toObject();
    res.json(userWithoutPassword);
  } catch (err) {
    console.error("GET /me error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin-only
router.get("/all", roleMiddleware(["admin"]), getAllUsers);
router.patch("/role/:id", roleMiddleware(["admin"]), updateUserRole);
router.put("/:id", roleMiddleware(["admin"]), updateUser);
router.delete("/:id", roleMiddleware(["admin"]), deleteUser);

// Admin + user route
router.get("/:id", roleMiddleware(["admin", "user"]), getUser);

module.exports = router;
