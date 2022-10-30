const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.MONGO_URL;
const createSuperAdmin = require("../util/setup.util");

mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connection successful.");
    createSuperAdmin();
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const dbase = mongoose.connection;

module.exports = dbase;
