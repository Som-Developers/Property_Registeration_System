const express = require("express");
const router = express.Router();

const { approveProperty, approveOwner } = require("../controller/adminController");

const { verifyToken } = require("../middlewares/verifyToken");
const { getAllOwner } = require("../controller/ownerController");

router.get("/owners", verifyToken, getAllOwner); // ✅ Lists all registered owners

router.patch("/approve-property/:id", verifyToken, approveProperty);
router.patch("/approve-owner/:id", verifyToken, approveOwner);


module.exports = router;