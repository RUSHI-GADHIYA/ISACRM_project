const rest = require("./rest");

// Database Models
const Student = require("../db/models/student-model");
const { request } = require("express");

getAllStudent = (request, respone) => {
  rest.getAllStudent(request, respone, Student);
};

getStudentByID = (request, response) => {
  rest.getByID(request, response, Student);
  //updateVisited(request,response);
};

createStudent = (request, response) => {
  rest.createRecord(request, response, Student);
};

updateStudent = (request, response) => {
  rest.updateRecord(request, response, Student);
};

deleteStudent = (request, response) => {
  rest.deleteRecord(request, response, Student);
};

findStudent = (request, respone) => {
  rest.findByText(request, respone, Student)
}

getAllIntake = (request, respone) => {
  rest.getAllInTake(request, respone, Student)
}

findEmail = (request, respone) => {
  rest.findEmail(request, respone, Student)
}




module.exports = {
  getAllStudent,
  getStudentByID,
  createStudent,
  updateStudent,
  deleteStudent,
  findStudent,
  getAllIntake,
  findEmail
};
