const mongoose = require("mongoose");

const propertyDocumentSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property", 
    required: true,
  },
  documentType: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const PropertyDocument = mongoose.model("PropertyDocument", propertyDocumentSchema);
module.exports = PropertyDocument;
