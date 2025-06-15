const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadDocument } = require("../controllers/documentController");

// POST /api/documents/upload
router.post("/upload", upload.single("file"), uploadDocument);

module.exports = router;
