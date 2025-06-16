const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload"); // Make sure path is correct
const { uploadDocument } = require("../controller/documentController");

router.post("/upload", upload.single("file"), uploadDocument);

module.exports = router;
