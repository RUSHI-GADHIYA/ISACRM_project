const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname.replace("middlewares", "") + "/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

let uploadFile = multer({
  storage: storage,
}).array("notes", 10);

const filesMapper = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.attachedFiles = req.files.map((file) => {
      return {
        originalName: file.originalname,
        destination: file.filename,
        mimeType: file.mimetype,
      };
    });
  } else {
    req.body.attachedFiles = [];
  }

  next();
};

let uploadExcel = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}).single("datafile");


module.exports = { uploadFile, filesMapper, uploadExcel };
