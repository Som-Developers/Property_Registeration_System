

const createPropertyType =async (req,res)=>{
    try {
        const {name,description}=req.body
        const propertyType=await propertyType.create({name,description})
        res.status(201).json({message:"Property type created successfully",propertyType})
    } catch (error) {
        res.status(500).json({message:error.message})

    }
}
const getAllPropertyType =async (req,res)=>{
    try {
        const propertyType=await propertyType.find()
        res.status(200).json({message:"Property type found successfully",propertyType})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={
    createPropertyType,
    getAllPropertyType
}
    