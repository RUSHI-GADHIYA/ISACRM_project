const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");

// Retrive Categories Controller
const CategoryCtrl = require("../controllers/category.controller");

// CATEGORY ROUTES
// GET ALL
router.get("/category", [verifyToken], CategoryCtrl.getAllCategories);
// CREATE ROUTE
router.post("/category", [verifyToken], CategoryCtrl.createCategory);
// DELETE ROUTE
router.delete("/category/:id", [verifyToken], CategoryCtrl.deleteCategory);

module.exports = router;
