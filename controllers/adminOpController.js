const Url = require("../models/urlModel");

exports.listAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ message: "URL deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateUrl = async (req, res) => {
  try {
    const updated = await Url.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
