const mongoose = require('mongoose');

const PropertyTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ""
  },
}, { timestamps: true });

module.exports = mongoose.model('PropertyType', PropertyTypeSchema);