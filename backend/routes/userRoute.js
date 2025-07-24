const express = require("express");
const { registerUser, getUser, updateUser, deleteUser, loginUser, forgotPassword, resetPassword, getAllUsers, updateUserRole, getCurrentUser } = require("../controller/authConroller");
const { registerUserMiddleware } = require("../middlewares/userMiddlewares");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUserMiddleware, registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes - specific routes first
router.get("/me", roleMiddleware(["admin", "user"]), getCurrentUser);
router.get("/all", roleMiddleware(["admin"]), getAllUsers);
router.patch("/role/:id", roleMiddleware(["admin"]), updateUserRole);

// Dynamic routes - keep these at the end
router.get("/:id", roleMiddleware(["admin", "user"]), getUser);
router.put("/:id", roleMiddleware(["admin"]), updateUser);
router.delete("/:id", roleMiddleware(["admin"]), deleteUser);



module.exports = router;