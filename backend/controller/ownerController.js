const Owner = require("../models/ownerModel");

// Register Owner
const registerOwner = async (req, res) => {
  try {
    const { fullName, phone, address = "", govIdProof } = req.body;
    const currentUser = req.user;

    if (!currentUser || (!currentUser.userId && !currentUser.id)) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const userId = currentUser.userId || currentUser.id;

    // Check if this phone number already exists
    const existingOwner = await Owner.findOne({ phone });
    if (existingOwner) {
      return res.status(400).json({ message: "Owner already exists with this phone" });
    }

    // Check if the user is already an owner
    const userOwner = await Owner.findOne({ userId });
    if (userOwner) {
      return res.status(400).json({ message: "User is already registered as an owner" });
    }

    const newOwner = await Owner.create({
      fullName,
      phone,
      address,
      govIdProof,
      userId,
    });

    const populatedOwner = await newOwner.populate("userId");

    res.status(201).json({
      success: true,
      message: "Owner registered successfully",
      owner: populatedOwner,
    });
  } catch (error) {
    console.error("Register Owner Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get Single Owner
const getOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json({ message: "Owner found", owner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Owners (with pagination and search)
const getAllOwner = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      searchFields = "fullName,phone",
      sort = "-createdAt",
    } = req.query;

    const skip = (page - 1) * limit;
    const query = {};

    if (search && searchFields) {
      const fields = searchFields.split(",").map(f => f.trim());
      const regex = new RegExp(search, "i");
      query.$or = fields.map(field => ({ [field]: { $regex: regex } }));
    }

    const sortObj = {};
    sort.split(",").forEach(field => {
      const order = field.startsWith("-") ? -1 : 1;
      const fieldName = field.replace("-", "");
      sortObj[fieldName] = order;
    });

    const total = await Owner.countDocuments(query);
    const owners = await Owner.find(query)
      .sort(sortObj)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("userId", "username email")
      .lean();

    res.status(200).json({
      success: true,
      docs: owners,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Owner
const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findById(id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    owner.fullName = req.body.fullName;
    owner.phone = req.body.phone;
    owner.address = req.body.address;
    owner.govIdProof = req.body.govIdProof;

    await owner.save();
    res.status(200).json({ message: "Owner updated successfully", owner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Owner
const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByIdAndDelete(id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Owner Stats
const getOwnerStats = async (req, res) => {
  try {
    const total = await Owner.estimatedDocumentCount().catch(() => Owner.countDocuments());
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recent = await Owner.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrendRaw = await Owner.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      { $project: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } } },
      { $group: { _id: { year: "$year", month: "$month" }, count: { $sum: 1 } } },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthlyTrend = monthlyTrendRaw.map(({ _id, count }) => ({
      year: _id.year,
      month: _id.month,
      count,
    }));

    res.status(200).json({
      success: true,
      data: {
        total,
        recent,
        monthlyTrend,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating stats",
    });
  }
};

module.exports = {
  registerOwner,
  getOwner,
  getAllOwner,
  updateOwner,
  deleteOwner,
  getOwnerStats,
};
