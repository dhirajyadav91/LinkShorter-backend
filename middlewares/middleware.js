const jwt = require("jsonwebtoken");
const Admin = require("../models/adminAuthModel");

exports.isAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.admin = await Admin.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ error: "No token, not authorized" });
  }
};
