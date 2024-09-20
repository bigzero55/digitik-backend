const mysql = require("mysql2");
require("dotenv").config();
const fs = require("fs");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // Atur ini sesuai kebutuhan
    ca: fs.readFileSync("./certs/ca-cert.pem"), // Sertifikat CA
  },
});

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Koneksi database terputus.");
      err.message = "Koneksi database terputus.";
      err.code = "DATABASE_CONNECTION_LOST";
    } else {
      console.error("Gagal terhubung ke database:", err);
      err.message = "Gagal terhubung ke database.";
      err.code = "DATABASE_CONNECTION_ERROR";
    }
    return;
  }
  console.log("Database terhubung");
});

module.exports = db;
