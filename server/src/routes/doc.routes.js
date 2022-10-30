const express = require("express");
const router = express.Router();
const {
  verifyToken,
} = require("../middlewares/auth.middleware");

const { downloadFile } = require("../controllers/doc.controller");

// NOTE ROUTES
// GET ALL NORMAL NOTE
router.get("/doc/:id", [verifyToken], downloadFile);

module.exports = router;
