const PropertyDocument = require("../models/propertyDocumentModel");
const Property = require("../models/propertyModel");

const uploadDocument = async (req, res) => {
  try {
    const { propertyId, documentType } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    const document = new PropertyDocument({
      propertyId,
      documentType,
      filePath: `/uploads/documents/${file.filename}`,
    });

    await document.save();
    res.status(201).json({ message: "Document uploaded successfully", document });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadDocument };
