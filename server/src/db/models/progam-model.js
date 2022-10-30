const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { type: String, required: false },
  campus: { type: String, required: false },
});

module.exports = mongoose.model("Program", programSchema);
