const Property = require("../models/propertyModel")
const Owner = require("../models/ownerModel")
const PropertyType = require("../models/propertyTypeModel")

// ✅ Register property - only for VERIFIED owners
const createProperty = async (req, res) => {
  try {
    const { property_name, address, area_size, property_type, description } = req.body
    const currentUser = req.user // From JWT token

    console.log("Creating property for user:", currentUser.id)

    // ✅ Find owner and check if verified
    const owner = await Owner.findOne({ userId: currentUser.id })
    if (!owner) {
      return res.status(404).json({
        message: "Owner profile not found. Please register as owner first.",
        needsOwnerRegistration: true,
      })
    }

    // ✅ Check if owner is verified by admin
    if (!owner.isVerified) {
      return res.status(403).json({
        message: "Your owner profile is pending admin approval. Please wait for verification.",
        ownerStatus: "pending",
      })
    }

    // ✅ Verify property type exists
    const propertyTypeExists = await PropertyType.findById(property_type)
    if (!propertyTypeExists) {
      return res.status(404).json({ message: "Invalid property type selected" })
    }

    // ✅ Create property with verified owner
    const newProperty = await Property.create({
      property_name,
      address,
      area_size,
      property_type,
      owner: owner._id, // Use the verified owner's ID
      description: description || "",
      is_approved: false, // Always starts as pending
    })

    // ✅ Return populated data
    const populatedProperty = await Property.findById(newProperty._id)
      .populate("property_type", "name description")
      .populate("owner", "fullName phone")

    res.status(201).json({
      message: "Property registered successfully! It's now pending admin approval.",
      property: populatedProperty,
    })
  } catch (error) {
    console.error("Property creation error:", error)
    res.status(500).json({ message: error.message })
  }
}

// ✅ Get property types (public)
const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find().select("_id name description").sort({ name: 1 })

    res.status(200).json({
      message: "Property types retrieved",
      data: propertyTypes,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ Get current user's properties
const getMyProperties = async (req, res) => {
  try {
    const currentUser = req.user

    const owner = await Owner.findOne({ userId: currentUser.id })
    if (!owner) {
      return res.status(404).json({ message: "Owner profile not found" })
    }

    const properties = await Property.find({ owner: owner._id })
      .populate("property_type", "name description")
      .sort({ created_at: -1 })

    res.status(200).json({
      message: "Your properties",
      data: properties,
      ownerStatus: owner.isVerified ? "verified" : "pending",
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ Get current user's owner status
const getOwnerStatus = async (req, res) => {
  try {
    const currentUser = req.user

    const owner = await Owner.findOne({ userId: currentUser.id })
    if (!owner) {
      return res.status(404).json({
        message: "Owner profile not found",
        hasProfile: false,
      })
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
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Keep your existing functions
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("property_type").populate("owner")
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("property_type").populate("owner")
    if (!property) return res.status(404).json({ message: "Property not found" })
    res.json(property)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ message: "Property not found" })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteProperty = async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Property not found" })
    res.json({ message: "Property deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const searchProperty = async (req, res) => {
  try {
    const { property_type, owner, area_size } = req.query
    const query = {}
    if (property_type) {
      query.property_type = property_type
    }
    if (owner) {
      query.owner = owner
    }
    if (area_size) {
      query.area_size = area_size
    }
    const properties = await Property.find(query)
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

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
}
