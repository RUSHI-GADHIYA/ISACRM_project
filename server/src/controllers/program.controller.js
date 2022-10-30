const rest = require("./rest");

// Database Models
const Program = require("../db/models/progam-model");

getAllProgram = (request, respone) => {
  rest.getAll(request, respone, Program);
};

getProgramByID = (request, response) => {
  rest.getByID(request, response, Program);
};

createProgram = (request, response) => {
  rest.createRecord(request, response, Program);
};

updateProgram = (request, response) => {
  rest.updateRecord(request, response, Program);
};

deleteProgram = (request, response) => {
  rest.deleteRecord(request, response, Program);
};

module.exports = {
  createProgram,
  updateProgram,
  deleteProgram,
  getAllProgram,
  getProgramByID,
};
