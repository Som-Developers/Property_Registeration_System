const Property = require("../models/propertyModel");
const Owner = require("../models/ownerModel");
const PropertyType = require("../models/propertyTypeModel");

// ✅ Register property - only for VERIFIED owners
const createProperty = async (req, res) => {
  try {
    const { property_name, address, area_size, property_type, description } = req.body;
    const file = req.file;
    const currentUser = req.user;

    const owner = await Owner.findOne({ userId: currentUser.id });
    if (!owner) return res.status(404).json({ message: "Owner profile not found" });
    if (!owner.isVerified) return res.status(403).json({ message: "Owner not yet verified" });

    const propertyTypeExists = await PropertyType.findById(property_type);
    if (!propertyTypeExists) return res.status(404).json({ message: "Invalid property type" });

    const newProperty = await Property.create({
      property_name,
      address,
      area_size,
      property_type,
      owner: owner._id,
      description: description || "",
      is_approved: false,
      documents: file
        ? [
            {
              filePath: `/uploads/documents/${file.filename}`,
            },
          ]
        : [],
    });

    const populated = await Property.findById(newProperty._id)
      .populate("property_type", "name")
      .populate("owner", "fullName");

    res.status(201).json({
      message: "Property created successfully",
      property: populated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get property types (public)
const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find().select("_id name description").sort({ name: 1 });
    res.status(200).json({
      message: "Property types retrieved",
      data: propertyTypes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get current user's properties
const getMyProperties = async (req, res) => {
  try {
    const currentUser = req.user;
    const owner = await Owner.findOne({ userId: currentUser.id });
    if (!owner) {
      return res.status(404).json({ message: "Owner profile not found" });
    }

    const properties = await Property.find({ owner: owner._id })
      .populate("property_type", "name description")
      .sort({ created_at: -1 });

    res.status(200).json({
      message: "Your properties",
      data: properties,
      ownerStatus: owner.isVerified ? "verified" : "pending",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get current user's owner status
const getOwnerStatus = async (req, res) => {
  try {
    const currentUser = req.user;
    const userId = currentUser.id || currentUser._id;

    const owner = await Owner.findOne({ userId });
    if (!owner) {
      return res.status(404).json({
        message: "Owner profile not found",
        hasProfile: false,
      });
    }

    res.status(200).json({
      message: "Owner profile found",
      hasProfile: true,
      owner: {
        _id: owner._id,
        fullName: owner.fullName,
        phone: owner.phone,
        address: owner.address,
        isVerified: owner.isVerified,
        createdAt: owner.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all properties (with pagination)
const getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Property.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const properties = await Property.find()
      .populate("property_type")
      .populate("owner")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: {
        docs: properties,
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("property_type")
      .populate("owner");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update property
const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Property not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete property
const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Search property by filters
const searchProperty = async (req, res) => {
  try {
    const { property_type, owner, area_size } = req.query;
    const query = {};
    if (property_type) query.property_type = property_type;
    if (owner) query.owner = owner;
    if (area_size) query.area_size = area_size;

    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  searchProperty,
  getPropertyTypes,
  getMyProperties,
  getOwnerStatus,
};
