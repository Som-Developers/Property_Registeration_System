const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  property_name: { type: String, required: true },    // maps to property_name
  address: { type: String, required: true },
  area_size: { type: String, required: true },

  // Foreign keys
  property_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true
  },

  is_approved: { type: Boolean, default: false },

  // Auto timestamps
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Property", propertySchema);
