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
const adminId = req.user.userId; // ✅ Correct access to token's user ID

    const admin = await User.findById(adminId);
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    if (admin.role !== "admin") return res.status(400).json({ success: false, message: "Unauthorized access" });

     const ownerId = req.params.id;

    const owner = await Owner.findById(ownerId);
    if (!owner) return res.status(400).json({ success: false, message: "Owner not found" });

    const user = await User.findById(owner.userId);
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    if (owner.isVerified) return res.status(400).json({ success: false, message: "Owner already approved" });

    owner.isVerified = true;
    await owner.save();

    await sendApproveOwnerSuccess(user.email);

    res.status(200).json({ success: true, message: "Owner approved successfully" });

  } catch (error) {
    console.log("Error approving owner:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = { approveProperty, approveOwner };
