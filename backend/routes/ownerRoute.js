const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { 
    registerOwner, 
    getOwner, 
    updateOwner, 
    deleteOwner, 
    getAllOwner, 
    getOwnerStats 
} = require("../controller/ownerController");

const router = express.Router();

// Public routes (if any)

// Protected routes (require authentication)
router.use(verifyToken);

// Owner statistics - must come before /:id to avoid conflict
router.get("/stats", getOwnerStats);

// Owner CRUD operations
router.post("/register", registerOwner);

// Specific owner operations - must come after specific routes
router.get("/:id", getOwner);
router.put("/:id", updateOwner);
router.delete("/:id", deleteOwner);

// Get all owners - must come after specific routes
router.get("/", getAllOwner);

module.exports = router;