const Admin = require("../models/adminAuthModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  if (!process.env.JWT_SECRETE) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRETE, { expiresIn: "7d" });
};

exports.registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await Admin.findOne({ username });
    if (exists) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const admin = await Admin.create({ username, password });

    res.status(201).json({
      message: "Admin registered successfully",
      token: generateToken(admin._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(admin._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};
