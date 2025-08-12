const { nanoid } = require("nanoid");
const Url = require("../models/urlModel");

const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Create Short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: "longUrl is required" });

    const existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.json({
        shortUrl: `${BASE_URL}/${existing.shortCode}`,
        shortCode: existing.shortCode
      });
    }

    let code = nanoid(7);
    while (await Url.findOne({ shortCode: code })) {
      code = nanoid(7);
    }

    const urlDoc = await Url.create({ longUrl, shortCode: code });
    res.json({ shortUrl: `${BASE_URL}/${code}`, shortCode: code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Redirect Short URL                                                        
exports.redirectShortUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const doc = await Url.findOne({ shortCode: shortcode });
    if (!doc) return res.status(404).send("Short URL not found");

    doc.visits += 1;
    await doc.save();

    res.redirect(doc.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
