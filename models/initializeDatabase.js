const db = require("./db");

const initializeDatabase = () => {
  db.serialize(() => {
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      full_name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS participants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      unix TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    //undrefactored

    db.run(`CREATE TABLE IF NOT EXISTS participants_additional_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      participant_id INTEGER NOT NULL,
      key TEXT NOT NULL,
      value TEXT,
      FOREIGN KEY (participant_id) REFERENCES participants(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      unix TEXT NOT NULL,
      description TEXT,
      date DATE NOT NULL,
      price INTEGER DEFAULT 0,
      capacity INTEGER NOT NULL,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      participant_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      booking_code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (participant_id) REFERENCES participants(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      reservation_id INTEGER NOT NULL,
      payment_date DATETIME NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (reservation_id) REFERENCES reservations(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      unix TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    )`);
    //undrefactored
    db.run(`CREATE TABLE IF NOT EXISTS validators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS scanned (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scanTime DATETIME DEFAULT CURRENT_TIMESTAMP,
      participant_id INTEGER NOT NULL,
      validator_id INTEGER NOT NULL,
      session_id INTEGER NOT NULL,
      FOREIGN KEY (participant_id) REFERENCES participants(id),
      FOREIGN KEY (validator_id) REFERENCES validators(id),
      FOREIGN KEY (session_id) REFERENCES sessions(id)
    )`);

    db.run(`
      CREATE TABLE IF NOT EXISTS verified (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      verified BOOLEAN DEFAULT false,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
  });
};

module.exports = initializeDatabase;
