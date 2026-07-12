const express = require("express");
const router = express.Router();

const {
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const verifyToken = require("../middleware/verifyToken");
const authorizeRoles = require("../middleware/authorizeRoles");

router.post(
    "/add",
    verifyToken,
    authorizeRoles("Admin"),
    addCategory
);

router.get(
    "/list",
    verifyToken,
    authorizeRoles("Admin"),
    getCategories
);

router.put(
    "/edit/:id",
    verifyToken,
    authorizeRoles("Admin"),
    updateCategory
);

router.delete(
    "/delete/:id",
    verifyToken,
    authorizeRoles("Admin"),
    deleteCategory
);

module.exports = router;