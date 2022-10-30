const express = require("express");
const router = express.Router();

router.use("/", require("./auth.routes"));
router.use("/", require("./category.routes"));
router.use("/", require("./note.routes"));
router.use("/", require("./program.routes"));
router.use("/", require("./student.routes"));
router.use("/", require("./user.routes"));
router.use("/", require("./doc.routes"));
router.use("/", require("./other.routes"));

module.exports = router;
