require("dotenv").config()
const mysql = require('mysql2');

// Membuat koneksi ke MySQL
const db = mysql.createPool(process.env.DB_URI);
    
db.getConnection(function (err, connection) {
  if (err instanceof Error) {
    console.log(err);
    return;
  }
  console.log("Database terhubung")
});

module.exports = db;