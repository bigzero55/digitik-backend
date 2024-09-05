const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();
const DB_URL = process.env.DATABASE_URL;
const db = new sqlite3.Database(DB_URL, (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

module.exports = db;
