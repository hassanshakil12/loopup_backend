const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/changePassword", authController.changePassword);

module.exports = router;
