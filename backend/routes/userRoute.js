const express = require("express");
const { registerUser, getUser, updateUser, deleteUser } = require("../controller/authConroller");

const router = express.Router();

router.post("/register", registerUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
