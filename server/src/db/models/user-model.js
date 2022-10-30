const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  campus: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  code: { type: String, required: false },
  name: { type: String, required: false },
  gender: { type: String, required: false },
  staffId: { type: String, required: true },
  role: {
    type: String,
    // There will be 4 user roles in the system
    // superAdmin, rcic, risia, user
    enum: ["superAdmin", "rcic", "risia", "general"],
    // Default value for the role field
    default: "general",
  },
});

module.exports = mongoose.model("User", userSchema);
