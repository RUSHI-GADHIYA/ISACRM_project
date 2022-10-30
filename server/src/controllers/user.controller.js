const rest = require("./rest");

// Database Models
const User = require("../db/models/user-model");

getAllUsers = (request, respone) => {
  rest.getAll(request, respone, User);
};

updateUser = (request, response) => {
  rest.updateRecord(request, response, User);
};

module.exports = {
  getAllUsers,
  updateUser,
};
