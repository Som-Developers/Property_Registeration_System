const User = require("../models/userModel");
const Owner = require("../models/ownerModel");

const ownerApproval = async (req, res) => {
    try {
        const adminId = req.user.id;

        const admin = await User.findById(adminId);
        if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

        if (admin.role !== "admin") return res.status(400).json({ success: false, message: "Unauthorized access" });

        const userId = req.params.id;
        const owner = await Owner.findOne({ userId });
        if (!owner) return res.status(400).json({ success: false, message: "Owner not found" });

        if (owner.isVerified === true) return res.status(400).json({ success: false, message: "Owner already approved" });

        owner.is_verified = true;
        await owner.save();

        res.status(200).json({ success: true, message: "Owner approved successfully" });
        
    } catch (error) {
        console.log("Error in ownerApproval ", error);
        res.status(400).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    ownerApproval,
};