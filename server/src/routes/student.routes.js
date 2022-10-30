const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const updateStudentVisited = require("../middlewares/student.middleware")

const StudentCtrl = require("../controllers/student.controller");
// SHOW ROUTES
// GET ALL INTAKE
router.get("/student/intake", [verifyToken], StudentCtrl.getAllIntake)

router.post("/student/email",[verifyToken],  StudentCtrl.findEmail)
// GET ALL
router.get("/student", [verifyToken], StudentCtrl.getAllStudent);
// GET ONE
router.get("/student/:id", [verifyToken, updateStudentVisited], StudentCtrl.getStudentByID);
// CREATE ROUTE
router.post("/student", [verifyToken],  StudentCtrl.createStudent);
// UPDATE ROUTE
router.put("/student/:id", [verifyToken, updateStudentVisited], StudentCtrl.updateStudent);
// DELETE ROUTE
router.delete("/student/:id", [verifyToken], StudentCtrl.deleteStudent);
// FIND BY TEXT ROUTE
router.post("/student/find",[verifyToken],  StudentCtrl.findStudent)



module.exports = router;
