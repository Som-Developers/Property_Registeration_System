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

const PropertyType = mongoose.model('PropertyType', PropertyTypeSchema);

module.exports = PropertyType;