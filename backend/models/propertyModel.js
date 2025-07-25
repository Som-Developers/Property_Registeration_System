const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  property_name: { type: String, required: true },
  address: { type: String, required: true },
  area_size: { type: String, required: true },

  property_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PropertyType",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },

  is_approved: { type: Boolean, default: false },

  documents: [
    {
      filePath: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],

  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", propertySchema);
