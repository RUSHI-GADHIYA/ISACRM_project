const express = require("express");
const router = express.Router();
const {
  verifyToken,
  isRcic,
  isRisia
} = require("../middlewares/auth.middleware");
const updateStudentVisited = require("../middlewares/student.middleware")

const NoteCtrl = require("../controllers/note.controller");
const { uploadFile, filesMapper } = require("../middlewares/files.middleware");
// NOTE ROUTES
// GET ALL NORMAL NOTE
router.get("/student/:id/note", [verifyToken], NoteCtrl.getAllNoteByStudent);

// GET ALL DOCS
router.get("/student/:id/doc", NoteCtrl.getAllDocsByStudent);

router.get("/student/:id/note", [verifyToken, updateStudentVisited], NoteCtrl.getAllNoteByStudent);
// GET ALL RCIC NOTE
router.get(
  "/student/:id/notercic",
  [verifyToken, isRcic],
  NoteCtrl.getAllNoteRcicByStudent
);
// GET ALL RISIA NOTE
router.get(
  "/student/:id/noterisia",
  [verifyToken, isRisia],
  NoteCtrl.getAllNoteRisiaByStudent
);
// GET ONE
router.get(
  "/student/:id/note/:noteid",
  [verifyToken],
  NoteCtrl.getNodeByIDByStudent
);
// CREATE ROUTE
router.post(
  "/student/:id/note",
  [verifyToken, uploadFile, filesMapper],
  NoteCtrl.createNoteRecord
);
router.post("/student/:id/note", [verifyToken, updateStudentVisited], NoteCtrl.createNoteRecord);
// UPDATE ROUTE
router.put(
  "/student/:id/note/:noteid",
  [verifyToken, updateStudentVisited],
  NoteCtrl.updateNoteRecord
);
// DELETE ROUTE
router.delete(
  "/student/:id/note/:noteid",
  [verifyToken, updateStudentVisited],
  NoteCtrl.deleteNoteRecord
);
// FIND ROUTE

module.exports = router;
