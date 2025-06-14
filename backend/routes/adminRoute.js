const express = require("express");
const router = express.Router();

const { approveProperty } = require("../controller/adminController");

const { verifyToken } = require("../middlewares/verifyToken");

router.patch("/approve-property/:id", verifyToken, approveProperty);

module.exports = router;