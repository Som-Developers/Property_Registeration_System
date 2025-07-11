const mongoose = require("mongoose");


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,

},{timestamps:true})

const User=mongoose.model("User",userSchema)    
module.exports=User