const db = require("./db");

const initializeDatabase = () => {
  db.serialize(() => {
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      gender TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS participants_additional_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      size TEXT,
      transport_type TEXT,
      city TEXT,
      FOREIGN KEY (participant_id) REFERENCES participants(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      price INTEGER DEFAULT 0,
      capacity INTEGER NOT NULL,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      booking_code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      approved_at DATETIME,
      FOREIGN KEY (participant_id) REFERENCES participants(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reservation_id INTEGER NOT NULL,
      payment_date DATETIME NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (reservation_id) REFERENCES reservations(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER NOT NULL,
      unix TEXT NOT NULL,
      name TEXT NOT NULL,
      desc TEXT NOT NULL,
      FOREIGN KEY (event_id) REFERENCES events(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS validators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS scanned (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scanTime INTEGER NOT NULL,
      participant_id INTEGER NOT NULL,
      validator_id INTEGER NOT NULL,
      session_id INTEGER NOT NULL,
      FOREIGN KEY (participant_id) REFERENCES participants(id),
      FOREIGN KEY (validator_id) REFERENCES validators(id),
      FOREIGN KEY (session_id) REFERENCES sessions(id)
    )`);
  });
};

module.exports = initializeDatabase;
