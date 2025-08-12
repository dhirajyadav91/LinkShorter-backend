const express = require("express");
const { createShortUrl, redirectShortUrl } = require("../controllers/allUrlcontroller");

const router = express.Router();

router.post("/shorten", createShortUrl);

// Redirect route at root level
router.get("/:shortcode", redirectShortUrl);

module.exports = router;
