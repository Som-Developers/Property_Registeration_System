const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const { sendApprovalEmail, sendRejectionEmail } = require("../mail/emails");
const Owner = require("../models/ownerModel");

// In approveProperty
await sendApprovalEmail(owner.email, property.propertyName);

// In rejectProperty
await sendRejectionEmail(owner.email, property.propertyName, reason);

const rejectProperty = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const propertyId = req.params.id;
    const { reason } = req.body;

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

    if (property.isRejected) {
      return res.status(400).json({ message: "Property already rejected" });
    }

    property.isRejected = true;
    property.rejectionReason = reason;
    await property.save();

    res.status(200).json({ message: "Property rejected successfully", property });

  } catch (error) {
    console.error("Rejection Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  approveProperty,
  rejectProperty
};
