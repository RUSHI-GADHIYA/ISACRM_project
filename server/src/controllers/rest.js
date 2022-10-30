// Database model
const User = require("../db/models/user-model");
const { emailAlreadyExist } = require("../middlewares/auth.middleware");

getNoteByStudentID = async (req, res, model) => {
  model.findById(req.params.id, "note", function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    resultFilter = [];
    User.findById(req.userId, function (err, user) {
      if (err) {
        console.log(err)
      }
      if (!user) {
        console.log("Not found user")
      }
      result.note.forEach((note) => {
        noteFilter = note;
        if (user.role !== "superAdmin") {
          if (note.isRcic) {
            if (user.role !== "rcic") {
              noteFilter.content = undefined;
            }
          }
          if (note.isRisia) {
            if (user.role !== 'risia') {
              noteFilter.content = undefined;
            }
          }
        }


        resultFilter.push(noteFilter);
      })
      const resultOrder = resultFilter.sort((a, b) => b.updated - a.updated)
      return res.status(200).json({ success: true, data: resultOrder });
    });


  });
};

getNoteRcicByStudentID = async (req, res, model) => {
  model.findById(req.params.id, "note", function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    resultFilter = [];
    result.note.forEach((note) => {
      if (note.isRcic) {
        resultFilter.push(note);
      }
    });

    return res.status(200).json({ success: true, data: resultFilter });
  });
};

getNoteRisiaByStudentID = async (req, res, model) => {
  model.findById(req.params.id, "note", function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    resultFilter = [];
    result.note.forEach((note) => {
      noteFilter = note;
      if (req.userId !== note.advisorID) {
        noteFilter.content = undefined;
      }
      if (note.isRcic) {
        if (!checkRcic) {
          noteFilter.content = undefined;
        }
      }
      if (note.isRisia) {
        if (!checkRisia) {
          noteFilter.content = undefined;
        }
      }
      resultFilter.push(noteFilter);
    });
    return res.status(200).json({ success: true, data: resultFilter });
  });
};

getNoteByIDStudentID = async (req, res, model) => {
  model.findById(req.params.id, function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }
    return res
      .status(200)
      .json({ success: true, data: result.note.id(req.params.noteid) });
  });
};

getDocsByStudentID = async (req, res, model) => {
  model.findById(req.params.id, "note", function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }

    resultFilter = [];
    result.note.forEach((note) => {
      if (note.attachedFiles && note.attachedFiles.length > 0) {
        note.attachedFiles.forEach((file) => {
          var fileWithCategory = {
            "originalName": file.originalName,
            "destination": file.destination,
            "mimeType": file.mimeType,
            _id: file._id,
          };
          fileWithCategory['category'] = note.category;
          fileWithCategory['updated'] = note.updated;
          resultFilter.push(fileWithCategory);
        });
      }
    });

    return res.status(200).json({ success: true, data: resultFilter });
  });
};

createNoteRecord = async (req, res, model) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide some data to create." });
  }

  // find the document to be create note in the database
  model.findOne({ _id: req.params.id }, (err, record) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!record) {
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }

    // loop over the object and update the properties
    body.advisorID = req.userId;
    record.note.push(body);
    record
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: record._id,
          message: "Note created.",
        });
      })
      .catch((error) => {
        return res.status(404).json({ error, message: "Note not created." });
      });
  });
};

updateNoteRecord = async (req, res, model) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide some data to update." });
  }

  // find the document to be updated in the database
  model.findOne({ _id: req.params.id }, (err, record) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!record.note.id(req.params.noteid)) {
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }

    // loop over the object and update the properties
    Object.keys(req.body).forEach((prop) => {
      record.note.id(req.params.noteid)[prop] = req.body[prop];
    });

    record
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: record._id,
          message: "Record updated.",
        });
      })
      .catch((error) => {
        return res.status(404).json({ error, message: "Record not updated." });
      });
  });
};

deleteNoteRecord = async (req, res, model) => {
  model.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { note: { _id: req.params.noteid } } },
    (err, record) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({
        success: true,
        id: record.note._id,
        message: "Note deleted.",
      });
    }
  );
};

getAllStudent = async (req, res, model) => {
  model.find({}, "-note", function (err, records) {
    if (err) {
      return res.status(400).json({ success: false, err: err });
    }
    if (!records.length) {
      return res
        .status(404)
        .json({ success: false, error: "No records found" });
    }
    const result = records.filter(student => student.visited.length > 0 && student.visited.advisorID === req.userId)
    const resultAddDate = []
    records.forEach(student => {
      student.visited.forEach(visited => {
        if (visited.advisorID === req.userId) {
          const record = student;
          record.updated = visited.updated
          resultAddDate.push(record)
        }
      })
    })
    const resultSorted = resultAddDate.sort((a, b) => b.updated - a.updated)
    return res
      .status(200)
      .json({ success: true, data: resultSorted.slice(0, 10) });
  });
};




getAll = async (req, res, model) => {
  model.find({}, "-note", function (err, records) {
    if (err) {
      return res.status(400).json({ success: false, err: err });
    }
    if (!records.length) {
      return res
        .status(404)
        .json({ success: false, error: "No records found" });
    }
    return res.status(200).json({ success: true, data: records });
  });
};

getByID = async (req, res, model) => {
  model.findById(req.params.id, "-note", function (err, result) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!result) {
      return res
        .status(404)
        .json({ success: false, error: "Student not found" });
    }
    return res.status(200).json({ success: true, data: result });
  });
};

createRecord = async (req, res, model) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: "You must specify  information" });
  }

  const record = new model(body);

  if (!record) {
    return res
      .status(400)
      .json({ success: false, error: "Creation record failed" });
  }

  record
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: record._id,
        message: "Record created.",
      });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: "Record not created" });
    });
};

updateRecord = async (req, res, model) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ success: false, error: "You must provide some data to update." });
  }

  // find the document to be updated in the database
  model.findOne({ _id: req.params.id }, (err, record) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!record) {
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }

    // loop over the object and update the properties
    Object.keys(req.body).forEach((prop) => {
      record[prop] = req.body[prop];
    });

    record
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: record._id,
          message: "Record updated.",
        });
      })
      .catch((error) => {
        return res.status(404).json({ error, message: "Record not updated." });
      });
  });
};

deleteRecord = async (req, res, model) => {
  model.findOneAndDelete({ _id: req.params.id }, function (err, record) {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!record) {
      return res
        .status(404)
        .json({ success: false, error: "Record not found" });
    }
    return res.status(200).json({ success: true, data: record });
  });
};

findByText = async (req, res, model) => {
  console.log(req.body.searchText)
  model
    .find({ $text: { $search: req.body.searchText } })
    .exec(function (err, records) {
      if (err) {
        return res.status(400).json({ success: false, err: err });
      }
      if (!records.length) {
        return res
          .status(404)
          .json({ success: false, error: "No records found" });
      }
      return res.status(200).json({ success: true, data: records });
    });
};

updateStudentVisited = (studentID, advisorID, model) => {
  model.findByIdAndUpdate({ studentID }, { "visited": { "advisorID": advisorID, "updated": Date.now() } })
}

getAllInTake = async (req, res, model) => {
  model.find({}, "-note", function (err, records) {
    if (err) {
      return res.status(400).json({ success: false, err: err });
    }
    if (!records.length) {
      return res
        .status(404)
        .json({ success: false, error: "No records found" });
    }
    const inTake = [...new Set(records.map(student => student.intake))]
    const inTakeFilter = inTake.filter(intake => intake != null)
    return res.status(200).json({ success: true, data: inTakeFilter });
  });
};

findEmail = async (req, res, model) => {
  const intake = req.body?.intake
  const campus = req.body?.campus
  const program = req.body?.program

  model.find({ intake: intake }, "-note", function (err, records) {
    if (err) {
      return res.status(400).json({ success: false, err: err });
    }
    if (!records.length) {
      return res
        .status(404)
        .json({ success: false, error: "No records found" });
    }
    const recordsFilter = records.filter(student => {
      if (program == undefined) {
        return true
      }
      var check = false
      student.program.forEach(studentProgram => {
        if (studentProgram.name === program) {
          check = true
          return
        }
      })
      return check
    }).filter(student => {
      if (campus == undefined) {
        return true
      }
      var check = false
      student.program.forEach(studentProgram => {
        if (studentProgram.campus === campus) {
          check = true
          return
        }
      })
      return check

    })
    const emails = [...new Set(recordsFilter.map(student => [student.email, student.fistName + ", " + student.lastName]))]
    const emailsFilter = emails.filter(student => student[0] != null)
    if (emailsFilter.length > 0) {
      return res.status(200).json({ success: true, data: emailsFilter });
    } else {
      return res.status(404).json({ success: false, error: "No record found" })
    }
  });
};

module.exports = {
  getAll,
  getByID,
  createRecord,
  updateRecord,
  deleteRecord,
  findByText,
  getNoteByStudentID,
  getNoteRcicByStudentID,
  getNoteRisiaByStudentID,
  getNoteByIDStudentID,
  updateNoteRecord,
  createNoteRecord,
  deleteNoteRecord,
  getAllStudent,
  getDocsByStudentID,
  updateStudentVisited,
  getAllInTake,
  findEmail
};
