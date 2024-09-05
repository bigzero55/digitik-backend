const db = require("./db");

// Fungsi untuk menambah reservation
const addReservation = (
  participantId,
  eventId,
  status,
  amount,
  createdAt,
  callback
) => {
  const sql = `
    INSERT INTO reservations (participant_id, event_id, status, amount, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [participantId, eventId, status, amount, createdAt];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Fungsi untuk mendapatkan semua reservations
const getAllReservations = (callback) => {
  const sql = "SELECT * FROM reservations";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Fungsi untuk mendapatkan reservation berdasarkan ID
const getReservationById = (id, callback) => {
  const sql = "SELECT * FROM reservations WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Fungsi untuk mengupdate reservation
const updateReservation = (
  id,
  participantId,
  eventId,
  status,
  amount,
  updatedAt,
  callback
) => {
  const sql = `
    UPDATE reservations
    SET participant_id = ?, event_id = ?, status = ?, amount = ?, updated_at = ?
    WHERE id = ?
  `;
  const params = [participantId, eventId, status, amount, updatedAt, id];
  db.run(sql, params, function (err) {
    callback(err);
  });
};

// Fungsi untuk menghapus reservation
const deleteReservation = (id, callback) => {
  const sql = "DELETE FROM reservations WHERE id = ?";
  db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = {
  addReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
