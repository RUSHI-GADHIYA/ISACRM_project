const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  dob: { type: Date, required: false },
  gender: { type: String, required: false },
  homeCountry: { type: String, required: false },
  phone: { type: String, required: false },
  program: [
    {
      name: { type: String, required: false },
      campus: { type: String, required: false },
      status: { type: String, required: false },
    },
  ],
  note: [
    {
      title: { type: String, required: false },
      category: [{ type: String, required: false }],
      content: { type: String, required: false },
      isRcic: { type: Boolean, required: false },
      isRisia: { type: Boolean, required: false },
      attachedFiles: [
        {
          originalName: {
            type: String,
            required: true,
          },
          destination: {
            type: String,
            required: true,
          },
          mimeType: {
            type: String,
            required: true,
          },
        },
      ],
      advisorID: { type: String, required: false },
      updated: { type: Date, default: Date.now },
      isFlag: { type: Boolean, required: false },
    },
  ],
  degree: { type: String, required: false },
  yearLengh: { type: Number, required: false },
  enrollStatus: { type: String, required: false },
  gradIn: { type: String, required: false },
  intake: { type: String, required: false },
  visited: [
    {
      advisorID: { type: String, required: false },
      updated: { type: Date, default: Date.now },
    },
  ],
});

studentSchema.index({ "$**" : "text" })
studentSchema.index({"note.$**" : "text"})
studentSchema.index({"program.$**" : "text"})
module.exports = mongoose.model("Student", studentSchema);
