import express from "express"
const router = express.Router();
import categoryController from "../controllers/categoryController.js";


router.post("/add", categoryController.addCategory);
router.get("/list", categoryController.getCategories);
router.put("/edit/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

export default router;