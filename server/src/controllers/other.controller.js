const xlsx = require('node-xlsx');
const Student = require("../db/models/student-model");

const excelToUsers = async (req, res) => {
    try {
        var obj = xlsx.parse(__dirname + '/../assets/uploads/' + req.file.filename);
        var data = obj[0].data;

        var headerIndex = -1;  // header row index
        for (var i = 0; i < data.length; i++) {
            if (data[i][0] == 'Name', data[i][1] == 'Id', data[i][2] == 'First Name') {
                headerIndex = i;
                break;
            }
        }

        if (headerIndex == -1) {
            return res.status(500).json({
                message: 'Invalid file format!',
                success: false
            });
        }

        var users = [];

        for (var i = headerIndex + 1; i < data.length; i++) {
            if (data[i][0] == undefined || data[i][1] == undefined || data[i][2] == undefined) {
                break;
            } else {
                var user = {
                    name: data[i][0],
                    studentId: data[i][1],
                    firstName: data[i][2],
                    lastName: data[i][3],
                    dob: data[i][4],
                    gender: data[i][5] == "M" ? "Male" : data[i][5] == "F" ? "Female" : "Unkown",
                    homeCountry: data[i][6],
                    email: data[i][7],
                    program: {
                        name: data[i][11],
                        campus: data[i][9],
                    },
                    intake: data[i][8],
                    yearLengh: data[i][13],
                    degree: data[i][12],
                    school: data[i][14],
                    enrollStatus: data[i][16],
                    gradIn: data[i][17],
                };
                users.push(user);
            }
        }

        for (var i = 0; i < users.length; i++) {
            try {
                var student = await Student.findOne({
                    studentId: users[i].studentId
                });

                if (student) {
                    const sameProgram = student.program.filter(program => program.name == users[i].program.name && program.campus == users[i].program.campus);
                    if (sameProgram.length == 0) {
                        student.program.push(users[i].program);
                    }
                    await student.save();
                } else {
                    var student = new Student(users[i]);
                    await student.save();
                }
            }
            catch (err) {
                return res.status(500).json({
                    message: err,
                    success: false
                });
            }
        }


        res.status(200).json({
            success: true,
            message: "Data imported successfully!",
        });
    }
    catch (err) {
        res.status(500).json({
            message: err,
            success: false
        });
    }
};

module.exports = {
    excelToUsers,
};
