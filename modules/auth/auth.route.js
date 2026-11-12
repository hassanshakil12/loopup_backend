const express = require("express");
const router = express.Router();

// Middlewares
const { rateLimiter } = require("../../middlewares/rateLimiter");
const protect = require("../../middlewares/authentication");

// Controllers
const authController = require("./auth.controller");

router.post("/login", rateLimiter, authController.login);
router.post("/register", rateLimiter, authController.register);
router.post("/logout", rateLimiter, authController.logout);
router.post(
  "/changePassword",
  rateLimiter,
  protect,
  authController.changePassword,
);

module.exports = router;
