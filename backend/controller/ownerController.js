const Owner = require("../models/ownerModel");




const registerOwner = async (req, res) => {
  try {
    const { fullName, phone, address, govIdProof } = req.body;
    const currentUser = req.user;

    if (!currentUser?.userId && !currentUser?.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const userId = currentUser.userId || currentUser.id;

    // Check if user already registered as an owner
    const existingOwner = await Owner.findOne({ userId });
    if (existingOwner) {
      return res.status(400).json({ message: "This user is already registered as an owner" });
    }

    // Create new owner
    const newOwner = await Owner.create({
      fullName,
      phone,
      address,
      govIdProof,
      userId,
    });

    // Populate userId field
    const populatedOwner = await Owner.findById(newOwner._id).populate("userId");

    res.status(201).json({ message: "Owner registered successfully", owner: populatedOwner });
  } catch (error) {
    console.error("Register Owner Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getOwner = async (req, res) => {
    try {
        const {id} =req.params;
        const owner=await Owner.findById(id)
        if(!owner){
            return res.status(404).json({message:"Owner not found"})
        }
        res.status(200).json({message:"Owner found successfully",owner})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllOwner = async (req, res) => {
    try {
        
        const owner=await Owner.find()
        if(!owner){
            return res.status(404).json({message:"Owner not found"})
        }
        res.status(200).json({message:"Owner found successfully",owner})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateOwner = async (req, res) => {
    try {
        const {id} =req.params;
        const owner=await Owner.findById(id)
        if(!owner){
            return res.status(404).json({message:"Owner not found"})
        }
        owner.fullName=req.body.fullName
        owner.phone=req.body.phone
        owner.address=req.body.address
        owner.govIdProof=req.body.govIdProof
        await owner.save()
        res.status(200).json({message:"Owner updated successfully",owner})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteOwner = async (req, res) => {
    try {
        const {id} =req.params;
        const owner=await Owner.findByIdAndDelete(id)
        if(!owner){
            return res.status(404).json({message:"Owner not found"})
        }
        res.status(200).json({message:"Owner deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    registerOwner,
    getOwner,
    getAllOwner,
    updateOwner,
    deleteOwner
}
    