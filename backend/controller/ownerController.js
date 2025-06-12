const Owner = require("../models/ownerModel");



const registerOwner = async (req, res) => {
    try {
        const {fullName,phone,address,govIdProof}=req.body;
        const currentUser=req.user
        console.log(currentUser)
        const owner = await Owner.findOne({phone})
        if(owner){
            return res.status(400).json({message:"Owner already exists"})
        }
        const newOwner=await Owner.create({
            fullName,
            phone,
            address,
            govIdProof,
            userId:currentUser.id
        })
        // Populate the userId field to include user details
        const populatedOwner = await newOwner.populate('userId')
        res.status(201).json({message:"Owner registered successfully",owner: populatedOwner})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error)
    };

}

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
    