const express = require("express");
const router = express.Router();
const { verifyToken, isSuperAdmin } = require("../middlewares/auth.middleware");

const UserCtrl = require("../controllers/user.controller");

// USER ROUTES
// GET ALL
router.get("/user",  UserCtrl.getAllUsers);
// UPDATE ROUTE
router.put("/user/:id",  UserCtrl.updateUser);

module.exports = router;
