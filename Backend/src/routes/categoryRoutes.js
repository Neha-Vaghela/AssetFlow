const express = require("express");

const router = express.Router();

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.post("/add", addCategory);
router.get("/list", getCategories);
router.put("/edit/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;