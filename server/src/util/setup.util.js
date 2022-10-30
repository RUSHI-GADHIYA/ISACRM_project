const bcrypt = require("bcryptjs");
const User = require("../db/models/user-model");

async function createSuperAdmin() {
  try {
    const superUser = await User.findOne({ role: "superAdmin" });
    if (!superUser) {
      const user = new User({
        email: "kathan565@gmail.com",
        password: bcrypt.hashSync("Saskatoon@123", 8),
        campus: "Saskatoon",
        firstName: "Kathan",
        lastName: "Patel",
        code: "1234",
        name: "Patel, Kathan",
        role: "superAdmin",
        staffId: "12345",
      });
      await user.save();
      console.log("Super user created");
    } else {
      console.log("Super user already exists");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = createSuperAdmin;
