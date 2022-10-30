const express = require("express");
const router = express.Router();
const {
    verifyToken,
} = require("../middlewares/auth.middleware");

const { uploadExcel } = require("../middlewares/files.middleware");
const { excelToUsers } = require("../controllers/other.controller");

// @route   POST api/users/import
router.post("/dataimport/", [verifyToken, uploadExcel], excelToUsers);

module.exports = router;
