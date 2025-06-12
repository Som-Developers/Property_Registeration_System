
// Import necessary modules
// Create Property Type with Duplicate Name Validation
const createPropertyType = async (req, res) => {
  const { name, description } = req.body;

  try {
    // ✅ Check if type already exists (case-insensitive)
    const existing = await PropertyType.findOne({
      name: new RegExp(`^${name.trim()}$`, 'i')
    });

    if (existing) {
      return res.status(400).json({ message: "Property type already exists" });
    }

    // ✅ Create new property type
    const newType = await PropertyType.create({
      name: name.trim(),
      description
    });

    res.status(201).json({ message: "Property type created successfully", data: newType });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

module.exports = { createPropertyType };
