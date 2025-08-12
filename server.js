require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoute");
const adminRoutes = require("./routes/adminRoute");
const adminAuthRoutes = require("./routes/adminAuthUrl");
const { redirectShortUrl } = require("./controllers/allUrlcontroller");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// Use CORS with options before routes
app.use(cors(corsOptions));
app.use(express.json());

// Server status route
app.get('/', (req, res) => {
  res.send('Backend is running');
});


// Redirect route for short URLs
app.get("/:shortcode", redirectShortUrl);


// Routes
app.use("/api/v1/url", urlRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/admin/auth", adminAuthRoutes); 
 // changed path to avoid conflict

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => { 
    console.error(err); 
    process.exit(1); 
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
