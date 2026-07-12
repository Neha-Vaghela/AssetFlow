const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

router.get(
    "/list",
    employeeController.getEmployees
);

router.post(
    "/add",
    employeeController.addEmployee
);

router.put(
    "/change-role",
    employeeController.changeRole
);

router.put(
    "/edit/:id",
    employeeController.editEmployee
);

module.exports = router;