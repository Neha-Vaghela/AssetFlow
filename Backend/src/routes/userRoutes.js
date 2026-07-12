const express = require("express");
const router = express.Router();

const {
    register,
    login,getAllUsers
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);

// Get All Users
router.get("/all", getAllUsers);

module.exports = router;