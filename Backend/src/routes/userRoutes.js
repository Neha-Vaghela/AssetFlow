
import express from "express";
import auth from "../middleware/auth.js";

import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/authLogin",auth,userController.authLogin);
router.post("/logOut",auth,userController.logOut);
router.post("/logOutAll",auth,userController.logOutAll);

export default router;