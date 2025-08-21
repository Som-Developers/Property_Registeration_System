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
  getCurrentUser,
} = require("../controller/authConroller");

const { registerUserMiddleware } = require("../middlewares/userMiddlewares");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

// ✅ Public routes
router.post("/register", registerUserMiddleware, registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Protected: Get current user info (logged in)
router.get("/me", verifyToken, async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user.toObject();
    res.json(userWithoutPassword);
  } catch (err) {
    console.error("GET /me error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin-only routes
router.get("/all", roleMiddleware(["admin"]), getAllUsers);
router.patch("/role/:id", roleMiddleware(["admin"]), updateUserRole);
router.put("/:id", roleMiddleware(["admin"]), updateUser);
router.delete("/:id", roleMiddleware(["admin"]), deleteUser);

// ✅ Dynamic user route (admin or user)
router.get("/:id", roleMiddleware(["admin", "user"]), getUser);

module.exports = router;
