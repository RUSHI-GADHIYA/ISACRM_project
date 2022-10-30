const rest = require("./rest");

// Database Models
const Category = require("../db/models/category-model");

getAllCategories = (request, respone) => {
  rest.getAll(request, respone, Category);
};

createCategory = (request, response) => {
  rest.createRecord(request, response, Category);
};

deleteCategory = (request, response) => {
  rest.deleteRecord(request, response, Category);
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
