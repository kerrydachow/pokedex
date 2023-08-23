const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/api/user/register", userController.registerUser);

router.post("/api/user/login", userController.loginUser);

router.post("/api/user/logout", userController.logoutUser);

module.exports = router;