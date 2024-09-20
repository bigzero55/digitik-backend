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
        return res.status(500).json({ error: err.message });
      }

      if (rows.length > 0) {
        return res.status(400).json({ message: "Email already in use" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.execute(
          `INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)`,
          [username, email, hashedPassword, full_name],
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { username, email, password, full_name } = req.body;

//   try {
//     // Cek apakah email sudah terdaftar
//     db.execute(`SELECT * FROM users WHERE email = ?`, [email], async (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       if (results.length > 0) return res.status(400).json({ message: "Email already in use" });

//       // Hash password sebelum disimpan
//       bcrypt.hash(password, 10, (err, hashedPassword) => {
//         if (err) {
//           return res.status(500).json({ error: "Failed to hash password" });
//         }

//         // Simpan user di database
//         db.execute(
//           `INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)`,
//           [username, email, hashedPassword, full_name],
//           function (err, result) {
//             if (err) {
//               return res.status(500).json({ error: err.message });
//             }

//             const userId = result.insertId; // Mendapatkan ID user dari hasil insert

//             // Simpan status verifikasi di tabel 'verified'
//             db.execute(
//               `INSERT INTO verified (user_id, verified) VALUES (?, ?)`,
//               [userId, false],
//               async (err) => {
//                 if (err) {
//                   return res.status(500).json({ error: "Failed to insert into verified table" });
//                 }

//                 // Buat token verifikasi
//                 const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
//                   expiresIn: "1h",
//                 });

//                 // Siapkan NodeMailer untuk mengirim email verifikasi
//                 const transport = nodemailer.createTransport({
//                   host: "sandbox.smtp.mailtrap.io",
//                   port: 2525,
//                   auth: {
//                     user: process.env.MAILTRAP_USER, // Username dari Mailtrap
//                     pass: process.env.MAILTRAP_PASS, // Password dari Mailtrap
//                   },
//                 });

//                 const verificationLink = `http://localhost:3000/api/verify/${token}`;

//                 const mailOptions = {
//                   from: "digitik@gmail.com",
//                   to: email,
//                   subject: "Verify your email",
//                   text: `Please verify your email by clicking the following link: ${verificationLink}`,
//                   html: `<p>Please verify your email by clicking the following link: <a href="${verificationLink}">Verify Email</a></p>`,
//                 };

//                 // Kirim email verifikasi
//                 transport.sendMail(mailOptions, (err, info) => {
//                   if (err) {
//                     return res.status(500).json({
//                       error: "Failed to send verification email",
//                     });
//                   }

//                   return res.status(200).json({
//                     message:
//                       "Signup successful! Please check your email to verify your account.",
//                   });
//                 });
//               }
//             );
//           }
//         );
//       });
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Signup failed", error });
//   }
// };

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah user ada di database
    db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err)
            return res
              .status(500)
              .json({ error: "Error during password comparison" });
          if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });

          res.json({ token });
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
