
// Database Models
const Student = require("../db/models/student-model");
const mongoose = require("mongoose");

const downloadFile = (req, res) => {

    var id = mongoose.Types.ObjectId(req.params.id);

    Student.aggregate([
        {
            '$unwind': {
                'path': '$note'
            }
        }, {
            '$unwind': {
                'path': '$note.attachedFiles'
            }
        }, {
            '$match': {
                'note.attachedFiles._id': id
            }
        }, {
            '$project': {
                'destination': '$note.attachedFiles.destination',
                'originalName': '$note.attachedFiles.originalName',
                'mimeType': '$note.attachedFiles.mimeType'
            }
        }
    ], (err, doc) => {
        if (err) {
            return res
                .status(404)
                .json({ success: false, error: "File not found" });
        }

        if (doc.length > 0) {
            const file = doc[0];
            const directoryPath = __dirname.replace("controllers", "") + "/assets/uploads/";
            res.download(directoryPath + file.destination, file.originalName, (err) => {
                if (err) {
                    res.status(500).send({
                        message: "Could not download the file. " + err,
                    });
                }
            });
        } else {

        }
    })


}

module.exports = { downloadFile };