const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/db"); // Assumsi db.js digunakan untuk query
const nodemailer = require("nodemailer");

// Sign Up without verified
const signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, full_name } = req.body;

  try {
    db.execute(`SELECT * FROM users WHERE email = ?`, [email], (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          code: "DATABASE_ERROR",
        });
      }

      if (rows.length > 0) {
        return res.status(400).json({
          message: "Email already in use",
          code: "EMAIL_IN_USE",
        });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
            code: "HASHING_ERROR",
          });
        }

        db.execute(
          `INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)`,
          [username, email, hashedPassword, full_name],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                error: err.message,
                code: "DATABASE_ERROR",
              });
            }

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      code: "UNKNOWN_ERROR",
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah user ada di database
    db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, results) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
            code: "DATABASE_ERROR",
          });
        }
        if (results.length === 0) {
          return res.status(404).json({
            message: "User not found",
            code: "USER_NOT_FOUND",
          });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err)
            return res.status(500).json({
              error: "Error during password comparison",
              code: "COMPARISON_ERROR",
            });
          if (!isMatch)
            return res.status(400).json({
              message: "Invalid credentials",
              code: "INVALID_CREDENTIALS",
            });

          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });

          res.json({ token });
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err.message,
      code: "UNKNOWN_ERROR",
    });
  }
};

module.exports = {
  signup,
  login,
};
