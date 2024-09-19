require("dotenv").config()
const mysql = require('mysql2');

// Membuat koneksi ke MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,     
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
    
    db.getConnection(function (err, connection) {
  if (err instanceof Error) {
    console.log(err);
    return;
  }

  console.log("Database terhubung")

});

module.exports = db;