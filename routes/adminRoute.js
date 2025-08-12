const express = require("express");
const { listAllUrls, deleteUrl, updateUrl } = require("../controllers/adminOpController");
const { isAdmin } = require("../middlewares/middleware");

const router = express.Router();

router.get("/list", isAdmin, listAllUrls);
router.delete("/:id", isAdmin, deleteUrl);
router.put("/:id", isAdmin, updateUrl);

module.exports = router;
