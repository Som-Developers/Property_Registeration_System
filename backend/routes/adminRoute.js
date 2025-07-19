const express = require("express");
const router = express.Router();

const { approveProperty, approveOwner } = require("../controller/adminController");

const { verifyToken } = require("../middlewares/verifyToken");

router.patch("/approve-property/:id", verifyToken, approveProperty);
router.patch("/approve-owner/:id", verifyToken, approveOwner);

module.exports = router;