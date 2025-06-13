const express = require("express");
const router = express.Router();

const {createPropertyType,getAllPropertyType}=require("../controller/propertyTypeController")

router.post("/create",createPropertyType)
router.get("/",getAllPropertyType)

module.exports=router
