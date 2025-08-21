const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const Owner = require("../models/ownerModel");

const { sendApproveOwnerSuccess, sendApprovePropertySuccess } = require("../mail/emails");
const approveProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "userId");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.is_approved) {
      return res.status(400).json({ message: "Property already approved" });
    }

    property.is_approved = true;
    await property.save();

    // ✅ Get user from property.owner.userId and send email
    // const user = await User.findById(property.owner.userId);
    // if (user) {
    //   await sendApprovePropertySuccess(user.email);
    // }

    res.status(200).json({
      message: "Property approved successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
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
