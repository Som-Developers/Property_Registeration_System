const mongoose = require("mongoose");


const ownerSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    govIdProof:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true, // ✅ Add this to ensure it's never missing

    }
},{timestamps:true})

const Owner =mongoose.model("Owner",ownerSchema)
module.exports=Owner

