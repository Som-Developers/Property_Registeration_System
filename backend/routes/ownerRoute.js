const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { registerOwner, getOwner, updateOwner, deleteOwner, getAllOwner } = require("../controller/ownerController");
const router = express.Router();

router.post("/register", verifyToken, registerOwner);
router.get("/:id", getOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);
router.get("/", getAllOwner);

module.exports = router;