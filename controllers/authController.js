const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/db"); // Assumsi db.js digunakan untuk query
const nodemailer = require("nodemailer");


// Sign Up without verified
const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, full_name } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (user)
          return res.status(400).json({ message: "Email already in use" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan user di database
        db.run(
          `INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)`,
          [username, email, hashedPassword, full_name],
          function (err) {
            if (err) {
              return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// const signup = async (req, res) => {
//   const { username, email, password, full_name } = req.body;

//   try {
//     // Cek apakah email sudah terdaftar
//     db.get(
//       `SELECT * FROM users WHERE email = ?`,
//       [email],
//       async (err, user) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (user)
//           return res.status(400).json({ message: "Email already in use" });

//         // Hash password sebelum disimpan
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Simpan user di database
//         db.run(
//           `INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)`,
//           [username, email, hashedPassword, full_name],
//           function (err) {
//             if (err) {
//               return res.status(500).json({ error: err.message });
//             }

//             const userId = this.lastID; // Mendapatkan userId dari hasil insert

//             // Simpan status verifikasi di tabel 'verified'
//             db.run(
//               `INSERT INTO verified (user_id, verified) VALUES (?, ?)`,
//               [userId, false],
//               async (err) => {
//                 if (err) {
//                   return res
//                     .status(500)
//                     .json({ error: "Failed to insert into verified table" });
//                 }

//                 // Buat token verifikasi
//                 const token = jwt.sign({ userId, email }, "your_secret_key", {
//                   expiresIn: "1h",
//                 });

//                 // Siapkan NodeMailer untuk mengirim email verifikasi
//                 const transport = nodemailer.createTransport({
//                   host: "sandbox.smtp.mailtrap.io",
//                   port: 2525,
//                   auth: {
//                     user: "9c90647c58c3fe",
//                     pass: process.env.MAILTRAP_PASS,
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
//                 await transport.sendMail(mailOptions);

//                 return res.status(200).json({
//                   message:
//                     "Signup successful! Please check your email to verify your account.",
//                 });
//               }
//             );
//           }
//         );
//       }
//     );
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ message: "Signup failed", error });
//   }
// };
// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah user ada
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ message: "Invalid credentials" });

        // Buat token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });

        res.json({ token });
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
