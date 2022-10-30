const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

const ProgramCtrl = require("../controllers/program.controller");
// PROGRAM ROUTES
// GET ALL
router.get("/program", [verifyToken], ProgramCtrl.getAllProgram);
// GET ONE
router.get("/program/:id", [verifyToken], ProgramCtrl.getProgramByID);
// CREATE ROUTE
router.post("/program", [verifyToken], ProgramCtrl.createProgram);
// UPDATE ROUTE
router.put("/program/:id", [verifyToken], ProgramCtrl.updateProgram);
// DELETE ROUTE
router.delete("/program/:id", [verifyToken], ProgramCtrl.deleteProgram);

module.exports = router;
