const Student = require("../db/models/student-model");
const rest = require("../controllers/rest");
// middleware to check if user is RCIC
const updateStudentVisited = (req, res, next) => {
  Student.findOne({ _id: req.params.id }, (err, record) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!record) {
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }

    // loop over the object and update the properties
    const body = {
      "advisorID": req.userId,
      "updated": Date.now()
    }
    const hasVisited = record.visited.filter(visit => visit.advisorID === req.userId)
    if (hasVisited.length < 1) {
      record.visited.push(body);
    } else {
      record.visited.id(hasVisited[0]._id)["updated"] = Date.now()
    }
    record
      .save()
      .then(() => {
        next();
      })
      .catch((error) => {
        return res.status(400).json({ success: false, error: error });
      });
  });
};

module.exports = updateStudentVisited