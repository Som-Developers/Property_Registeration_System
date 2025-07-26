const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/userModel");

const {sendPasswordResetEmail, sendResetSuccessEmail} = require("../mail/emails");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; 

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user"  
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error:", error);
  }
};

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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		console.log(`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

const getCurrentUser = async (req, res) => {
  try {
    // The user is attached to the request by the auth middleware
    const user = req.user;
    
    if (!user) {
      console.log('No user found in request');
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch fresh user data from the database
    const freshUser = await User.findById(user._id || user.id).select('-password');
    
    if (!freshUser) {
      console.log('User not found in database');
      return res.status(404).json({ message: "User not found in database" });
    }
    
    // Return user data
    const userData = {
      id: freshUser._id,
      username: freshUser.username,
      email: freshUser.email,
      role: freshUser.role,
      createdAt: freshUser.createdAt,
      updatedAt: freshUser.updatedAt
    };
    
    console.log('Returning user data:', userData);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


module.exports={
    registerUser,
    getUser,
    getCurrentUser,
    updateUser,
    getAllUsers,
    deleteUser,
    loginUser,
    forgotPassword,
    resetPassword,
    updateUserRole
}

