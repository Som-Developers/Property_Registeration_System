const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const Owner = require("../models/ownerModel");

const { sendApproveOwnerSuccess, sendApprovePropertySuccess } = require("../mail/emails");

const approveProperty = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const propertyId = req.params.id;

    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const property = await Property.findById(propertyId).populate("owner", "userId"); // Populate the owner field and include userId
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.isApproved) {
      return res.status(400).json({ message: "Property already approved" });
    }

    property.isApproved = true;
    await property.save();

    // check user role
    const user = await User.findById(property.owner.userId); // Populate the owner field and include userId
    if (!user || user.role !== "user") return res.status(400).json({ message: "Invalid user role" });


    await sendApprovePropertySuccess(user.email);


    res.status(200).json({ message: "Property approved successfully", property });

  } catch (error) {
    console.error("Approval Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveOwner = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the owner and populate userId
    const owner = await Owner.findById(id).populate("userId");

    if (!owner) {
      return res.status(404).json({ success: false, message: "Owner not found" });
    }

    // Optional: You can verify the user reference exists
    if (!owner.userId) {
      return res.status(404).json({ success: false, message: "User not found in owner record" });
    }

    owner.isVerified = true;
    await owner.save();

    res.status(200).json({ success: true, message: "Owner approved successfully", owner });
  } catch (error) {
    console.error("Approve Owner Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { approveProperty, approveOwner };
