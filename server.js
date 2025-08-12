require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoute");
const adminRoutes = require("./routes/adminRoute");
const adminAuthRoutes = require("./routes/adminAuthUrl");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


//server running
app.get('/', (req, res) => {
  res.send('Backend is running');
});


// Routes
app.use("/api/v1/url", urlRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/", urlRoutes);
// Routes
app.use("/api/v1/admin", adminAuthRoutes);

//cors 
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  optionsSuccessStatus: 200,
};


// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => { console.error(err); process.exit(1); });

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
