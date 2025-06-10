const PropertyType = require('../models/PropertyType');

// CREATE a new property type
exports.createPropertyType = async (req, res) => {
  try {
    const existing = await PropertyType.findOne({ 
      $or: [
        { name: req.body.name },
        { code: req.body.code }
      ]
    });
    if (existing) {
      return res.status(400).json({ message: 'Property type with this name or code already exists.' });
    }
    const propertyType = new PropertyType(req.body);
    await propertyType.save();
    res.status(201).json(propertyType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ all property types
exports.getAllPropertyTypes = async (req, res) => {
  try {
    const types = await PropertyType.find().sort({ sortOrder: 1, name: 1 });
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ a single property type by ID
exports.getPropertyTypeById = async (req, res) => {
  try {
    const type = await PropertyType.findById(req.params.id);
    if (!type) {
      return res.status(404).json({ message: 'Property type not found.' });
    }
    res.json(type);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE a property type by ID
exports.updatePropertyType = async (req, res) => {
  try {
    const updatedType = await PropertyType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedType) {
      return res.status(404).json({ message: 'Property type not found.' });
    }
    res.json(updatedType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a property type by ID
exports.deletePropertyType = async (req, res) => {
  try {
    const deletedType = await PropertyType.findByIdAndDelete(req.params.id);
    if (!deletedType) {
      return res.status(404).json({ message: 'Property type not found.' });
    }
    res.json({ message: 'Property type deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
