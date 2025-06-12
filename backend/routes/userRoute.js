const express = require("express");
const { registerUser, getUser, updateUser, deleteUser, loginUser, forgotPassword, resetPassword } = require("../controller/authConroller");
const { registerUserMiddleware, loginUserMiddleware } = require("../middlewares/userMiddlewares");

const router = express.Router();

router.post("/register",registerUserMiddleware, registerUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login",loginUserMiddleware, loginUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Admin-only routes
router.get("/all", roleMiddleware(["admin"]), getAllUsers);
router.patch("/role/:id", roleMiddleware(["admin"]), updateUserRole);

// Admin + user route
router.get("/:id", roleMiddleware(["admin", "user"]), getUser);

// Admin-only actions
router.put("/:id", roleMiddleware(["admin"]), updateUser);
router.delete("/:id", roleMiddleware(["admin"]), deleteUser);



module.exports = router;
