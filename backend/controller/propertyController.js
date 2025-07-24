const Property = require('../models/propertyModel');

// Create new property
const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties with pagination
const getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Property.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Get paginated data
    const properties = await Property.find()
      .populate('property_type')
      .populate('owner')
      .skip(skip)
      .limit(limit);

    res.json({
      data: {
        docs: properties,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('property_type')
      .populate('owner');

    if (!property) return res.status(404).json({ message: 'Property not found' });

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Property not found' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Property not found' });

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchProperty = async (req, res) => {
  try {
    const {property_type,owner,area_size} = req.query;
    const query = {};
    if(property_type){
      query.property_type = property_type;
    }
    if(owner){
      query.owner = owner;
    }
    if(area_size){
      query.area_size = area_size;
    }
    const properties = await Property.find(query);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  searchProperty
};
