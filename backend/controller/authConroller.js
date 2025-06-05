const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // token valid for 1 day
    );

    // Respond with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports={
    registerUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser
}

