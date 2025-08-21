const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middlewares/verifyToken")
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  searchProperty,
  getPropertyTypes,
  getMyProperties,
  getOwnerStatus,
} = require("../controller/propertyController")
const upload = require("../middlewares/upload"); // ✅ Add this


// ✅ Public routes
router.get("/property-types", getPropertyTypes)
router.get("/", getAllProperties)
router.get("/search", searchProperty)
router.get("/:id", getPropertyById)

// ✅ Protected routes (require authentication)
router.post("/", verifyToken, upload.single("document"), createProperty); // ✅ Fixed here
router.get("/my/properties", verifyToken, getMyProperties)
router.get("/my/owner-status", verifyToken, getOwnerStatus)
router.put("/:id", updateProperty)
router.delete("/:id", deleteProperty)

module.exports = router
