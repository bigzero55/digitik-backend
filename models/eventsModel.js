const db = require("./db");

// Tambah event baru
const addEvent = (event, callback) => {
  const { user_id, title, unix, description, date, price, capacity, location } =
    event;
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

  db.execute(sql, params, (err, results) => {
    if (err) {
      err.message = "Gagal menambahkan event";
      err.code = "EVENT_ADD_FAILED";
      return callback(err, null);
    } else {
      callback(null, results.insertId);
    }
  });
};

// Dapatkan semua events
const getAllEvents = (callback) => {
  const sql = "SELECT * FROM events";

  db.execute(sql, [], (err, results) => {
    if (err) {
      err.message = "Gagal mengambil data events";
      err.code = "EVENT_FETCH_FAILED";
      return callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Dapatkan event berdasarkan ID
const getEventById = (id, callback) => {
  const sql = "SELECT * FROM events WHERE id = ?";

  db.execute(sql, [id], (err, results) => {
    if (err) {
      err.message = "Gagal mengambil data event";
      err.code = "EVENT_FETCH_FAILED";
      return callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Update data event
const updateEvent = (id, event, callback) => {
  const { title, description, date, price, capacity, location } = event;
  const sql = `
    UPDATE events
    SET title = ?, description = ?, date = ?, price = ?, capacity = ?, location = ?
    WHERE id = ?
  `;
  const params = [title, description, date, price, capacity, location, id];

  db.execute(sql, params, (err, results) => {
    if (err) {
      err.message = "Gagal mengupdate data event";
      err.code = "EVENT_UPDATE_FAILED";
      return callback(err);
    } else {
      callback(null, results.affectedRows);
    }
  });
};

// Hapus event dan sesi terkait
const deleteEvent = (id, callback) => {
  db.execute(
    "DELETE FROM sessions WHERE event_id = ?",
    [id],
    (err, results) => {
      if (err) {
        err.message = "Gagal menghapus event";
        err.code = "EVENT_DELETE_FAILED";
        return callback(err);
      }

      db.execute("DELETE FROM events WHERE id = ?", [id], (err, results) => {
        if (err) {
          err.message = "Gagal menghapus event";
          err.code = "EVENT_DELETE_FAILED";
          return callback(err);
        } else {
          callback(null, results.affectedRows);
        }
      });
    }
  );
};

// Dapatkan semua sesi berdasarkan event ID
const getSessionsByEvent = (event_id, callback) => {
  const sql = "SELECT * FROM sessions WHERE event_id = ?";

  db.execute(sql, [event_id], (err, results) => {
    if (err) {
      err.message = "Gagal mengambil data sesi";
      err.code = "SESSION_FETCH_FAILED";
      return callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Hapus semua sesi berdasarkan event ID
const deleteSessionsByEvent = (event_id, callback) => {
  const sql = "DELETE FROM sessions WHERE event_id = ?";

  db.execute(sql, [event_id], (err, results) => {
    if (err) {
      err.message = "Gagal menghapus sesi";
      err.code = "SESSION_DELETE_FAILED";
      return callback(err);
    } else {
      callback(null, results.affectedRows);
    }
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
