const Property = require("../models/propertyModel");
const User = require("../models/userModel");

const approveProperty = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const propertyId = req.params.id;

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.isApproved) {
      return res.status(400).json({ message: "Property already approved" });
    }

    property.isApproved = true;
    await property.save();

    res.status(200).json({ message: "Property approved successfully", property });

  } catch (error) {
    console.error("Approval Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { approveProperty };
