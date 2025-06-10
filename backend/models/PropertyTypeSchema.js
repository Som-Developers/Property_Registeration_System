const mongoose = require('mongoose');

const PropertyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true, // e.g. "APT" for Apartment, "VIL" for Villa
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    enum: ["Residential", "Commercial", "Industrial", "Land", "Other"],
    required: true
  },
  iconUrl: {
    type: String, // URL to an icon image for UI
    default: ""
  },
  
  minArea: {
    type: Number, // in square meters
    default: 0
  },
  maxArea: {
    type: Number, // in square meters
    default: 0
  },
  allowedFloors: {
    type: Number, // for building types
    default: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number, // for ordering in dropdowns
    default: 0
  },
  imageUrl: { type: String }, 
  
 sortOrder: { type: Number, default: 0 }, 
 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('PropertyType', PropertyTypeSchema);
