const express = require("express");
const app = express();
const  dotenv = require("dotenv");
const cors = require("cors"); 

const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const ownerRoute = require("./routes/ownerRoute");
const adminRoute = require("./routes/adminRoute");
const propertyTypeRoute = require("./routes/propertTypeRoute");
const propertiesRoute=require("./routes/propertiesRoute");
const documentRoutes = require("./routes/documentRoutes"); 



// ✅ ENABLE CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://property-registeration-system.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
// Initialize config
dotenv.config();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads/documents", express.static("uploads/documents")); // 👈 Add this line

// Routes
app.use("/api/users", userRoute);
app.use("/api/owners", ownerRoute);
app.use("/api/propertyType", propertyTypeRoute);
app.use("/api/properties",propertiesRoute)
app.use("/api/documents", documentRoutes); 
app.use("/api/admin", adminRoute);




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
