const express = require("express")
const router = express.Router()
const { approveProperty, approveOwner } = require("../controller/adminController")
const { getAllOwner } = require("../controller/ownerController")
const { getAllProperties } = require("../controller/propertyController")
const { verifyToken } = require("../middlewares/verifyToken")

// ✅ Get all registered owners (admin use)
router.get("/owners", verifyToken, getAllOwner)

// ✅ Get all properties (admin use)
router.get("/properties", verifyToken, getAllProperties)

// ✅ Approve property or owner
router.patch("/approve-property/:id", verifyToken, approveProperty)
router.patch("/approve-owner/:id", verifyToken, approveOwner)

module.exports = router
