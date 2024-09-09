const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post(
  "/signup",
  [
    body("username").not().isEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  authController.signup
);

// Login Route
router.post("/login", authController.login);

module.exports = router;
