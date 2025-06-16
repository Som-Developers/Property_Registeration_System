const express = require("express");
const app = express();
const  dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const ownerRoute = require("./routes/ownerRoute");
const adminRoute = require("./routes/adminRoute");
const propertyTypeRoute = require("./routes/propertTypeRoute");
const propertiesRoute=require("./routes/propertiesRoute");
const documentRoutes = require("./routes/documentRoutes"); 
app.use("/api/admin", adminRoute);


// Initialize config
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/users", userRoute);
app.use("/api/owners", ownerRoute);
app.use("/api/propertyType", propertyTypeRoute);
app.use("/api/properties",propertiesRoute)
app.use("/api/documents", documentRoutes); 



// Basic route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
