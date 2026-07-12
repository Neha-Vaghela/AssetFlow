import express from "express";
import departmentController from "../controllers/departmentController.js";

const router = express.Router();

router.post("/create", departmentController.createDepartment);

router.get("/all", departmentController.getDepartments);

router.get("/:id", departmentController.getDepartment);

router.put("/update/:id", departmentController.updateDepartment);

router.patch("/deactivate/:id", departmentController.deactivateDepartment);

export default router;