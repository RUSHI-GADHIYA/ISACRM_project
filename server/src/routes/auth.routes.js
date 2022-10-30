const express = require("express");
const router = express.Router();
const {
  verifyToken,
  isSuperAdmin,
  emailAlreadyExist,
} = require("../middlewares/auth.middleware");

// Retrive Auth Controller
const authController = require("../controllers/auth.controller");

// Sign In Route
router.post("/auth/signin", authController.signIn);

// Create User Route
// Only Super Admin is allowed to create new users
router.post(
  "/auth/createUser",
  [verifyToken, isSuperAdmin, emailAlreadyExist],
  authController.createUser
);

// Refresh Token Route
router.post("/auth/refreshtoken", authController.refreshToken);

// Reset Password Route
router.post("/auth/resetPassword", authController.resetPassword);

// Forgot Password Route
router.post("/auth/forgotPassword", authController.forgotPassword);

module.exports = router;
