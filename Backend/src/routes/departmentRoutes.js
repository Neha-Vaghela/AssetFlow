const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");

const verifyToken = require("../middleware/verifyToken");
const authorizeRoles= require("../middleware/authorizeRoles");

// Create
router.post(
    "/create",
    verifyToken,
    authorizeRoles("Admin"),
    departmentController.createDepartment
);

// Get All
router.get(
    "/all",
    verifyToken,
    departmentController.getDepartments
);

// Get One
router.get(
    "/:id",
    verifyToken,
    departmentController.getDepartmentById
);

// Update
router.put(
    "/update/:id",
    verifyToken,
    authorizeRoles("Admin"),
    departmentController.updateDepartment
);

// Deactivate
router.patch(
    "/deactivate/:id",
    verifyToken,
    authorizeRoles("Admin"),
    departmentController.deactivateDepartment
);

module.exports = router;