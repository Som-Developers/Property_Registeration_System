const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyName: { type: String, required: true },
  address: { type: String, required: true },
  areaSize: { type: String, required: true },
  propertyTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "PropertyType", required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Property", propertySchema);
