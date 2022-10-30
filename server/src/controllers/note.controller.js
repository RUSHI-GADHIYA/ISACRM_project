const rest = require("./rest");


// Database Models
const Student = require("../db/models/student-model");

getAllNoteByStudent = (request, response) => {
  rest.getNoteByStudentID(request, response, Student);
};

getAllDocsByStudent = (request, response) => {
  rest.getDocsByStudentID(request, response, Student);
};

getAllNoteRcicByStudent = (request, response) => {
  rest.getNoteRcicByStudentID(request, response, Student);
};

getAllNoteRisiaByStudent = (request, response) => {
  rest.getNoteRisiaByStudentID(request, response, Student);
};

getNodeByIDByStudent = (request, respone) => {
  rest.getNoteByIDStudentID(request, respone, Student);
};

updateNoteRecord = (request, respone) => {
  rest.updateNoteRecord(request, respone, Student);
};

createNoteRecord = (request, respone) => {
  rest.createNoteRecord(request, respone, Student);
};

deleteNoteRecord = (request, respone) => {
  rest.deleteNoteRecord(request, respone, Student);
};

module.exports = {
  getAllNoteByStudent,
  getAllNoteRcicByStudent,
  getAllNoteRisiaByStudent,
  getNodeByIDByStudent,
  updateNoteRecord,
  createNoteRecord,
  deleteNoteRecord,
  getAllDocsByStudent
};
