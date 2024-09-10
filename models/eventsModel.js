const db = require("./db");

// Tambah event baru
const addEvent = (event, callback) => {
  const { user_id, title, unix, description, date, price, capacity, location } = event;
  const sql = `
    INSERT INTO events (user_id, title, unix, description, date, price, capacity, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [user_id, title, unix, description, date, price, capacity, location];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Dapatkan semua events
const getAllEvents = (callback) => {
  const sql = "SELECT * FROM events";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Dapatkan event berdasarkan ID
const getEventById = (id, callback) => {
  const sql = "SELECT * FROM events WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Update data event
const updateEvent = (id, event, callback) => {
  const { user_id, title, unix, description, date, price, capacity, location } = event;
  const sql = `
    UPDATE events
    SET user_id = ?, title = ?, unix = ?, description = ?, date = ?, price = ?, capacity = ?, location = ?
    WHERE id = ?
  `;
  const params = [user_id, title, unix, description, date, price, capacity, location, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Hapus event dan sesi terkait
const deleteEvent = (id, callback) => {
  db.serialize(() => {
    // Hapus semua sesi terkait dengan event
    db.run("DELETE FROM sessions WHERE event_id = ?", [id], (err) => {
      if (err) {
        callback(err);
        return;
      }
      // Hapus event
      db.run("DELETE FROM events WHERE id = ?", [id], (err) => {
        callback(err);
      });
    });
  });
};

// Dapatkan semua sesi berdasarkan event ID
const getSessionsByEvent = (event_id, callback) => {
  const sql = "SELECT * FROM sessions WHERE event_id = ?";
  db.all(sql, [event_id], (err, rows) => {
    callback(err, rows);
  });
};

// Hapus semua sesi berdasarkan event ID
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