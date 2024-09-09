const db = require("./db");

// Fungsi untuk menambah event
const addEvent = (
  user_id,
  title,
  unix,
  description,
  date,
  price,
  capacity,
  location,
  callback
) => {
  const sql = `
    INSERT INTO events (user_id, title, unix, description, date, price, capacity, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    user_id,
    title,
    unix,
    description,
    date,
    price,
    capacity,
    location,
  ];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Fungsi untuk mendapatkan semua events
const getAllEvents = (callback) => {
  const sql = "SELECT * FROM events";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Fungsi untuk mendapatkan event berdasarkan ID
const getEventById = (id, callback) => {
  const sql = "SELECT * FROM events WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Fungsi untuk mengupdate event
const updateEvent = (
  id,
  user_id,
  title,
  unix,
  description,
  date,
  price,
  capacity,
  location,
  callback
) => {
  const sql = `
    UPDATE events
    SET user_id = ?, title = ?, unix = ?, description = ?, date = ?, price = ?, capacity = ?, location = ?
    WHERE id = ?
  `;
  const params = [
    user_id,
    title,
    unix,
    description,
    date,
    price,
    capacity,
    location,
    id,
  ];
  db.run(sql, params, function (err) {
    callback(err);
  });
};

// Fungsi untuk menghapus event
const deleteEvent = (id, callback) => {
  // Mulai transaksi
  db.serialize(() => {
    // Hapus semua data terkait di tabel sessions
    db.run("DELETE FROM sessions WHERE event_id = ?", [id], (err) => {
      if (err) {
        callback(err);
        return;
      }
      // Hapus event itu sendiri
      db.run("DELETE FROM events WHERE id = ?", [id], function (err) {
        callback(err);
      });
    });
  });
};

// Fungsi untuk mendapatkan sesi berdasarkan event ID
const getSessionsByEvent = (event_id, callback) => {
  const sql = "SELECT * FROM sessions WHERE event_id = ?";
  db.all(sql, [event_id], (err, rows) => {
    callback(err, rows);
  });
};

// Fungsi untuk menghapus semua sesi berdasarkan event ID
const deleteSessionsByEvent = (event_id, callback) => {
  const sql = "DELETE FROM sessions WHERE event_id = ?";
  db.run(sql, [event_id], (err) => {
    callback(err);
  });
};

module.exports = {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getSessionsByEvent,
  deleteSessionsByEvent,
};
