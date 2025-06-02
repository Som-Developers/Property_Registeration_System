const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerUser =async (req,res)=>{
    try {
        const {username,email,password}=req.body;
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({
            username,
            email,
            password:hashedPassword
        })
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log("error:",error)
    }
}

const getUser=async(req,res)=>{
    try {
        const {id} =req.params;
        const user=await User.findById(id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User found successfully",user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateUser=async(req,res)=>{
    try {
        const {id} =req.params;
        const user=await User.findByIdAndUpdate(id,req.body,{new:true})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.username=req.body.username
        user.email=req.body.email
        user.password=req.body.password
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteUser=async(req,res)=>{
    try {
        const {id} =req.params;
        const user=await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    registerUser,
    getUser,
    updateUser,
    deleteUser
}