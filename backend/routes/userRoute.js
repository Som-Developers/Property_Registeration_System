const express = require("express");
const { registerUser, getUser, updateUser, deleteUser, loginUser } = require("../controller/authConroller");
const { registerUserMiddleware } = require("../middlewares/userMiddlewares");

const router = express.Router();

router.post("/register",registerUserMiddleware, registerUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

module.exports = router;
