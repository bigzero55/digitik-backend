const db = require("./db");

// Tambah reservasi baru
const addReservation = (reservation, callback) => {
  const { participant_id, event_id, status, amount, created_at } = reservation;
  const sql = `
    INSERT INTO reservations (participant_id, event_id, status, amount, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [participant_id, event_id, status, amount, created_at];
  db.run(sql, params, function (err) {
    callback(err, this.lastID); // Mengembalikan ID reservasi yang baru
  });
};

// Dapatkan semua reservasi
const getAllReservations = (callback) => {
  const sql = "SELECT * FROM reservations";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Dapatkan reservasi berdasarkan ID
const getReservationById = (id, callback) => {
  const sql = "SELECT * FROM reservations WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Update data reservasi
const updateReservation = (id, reservation, callback) => {
  const { participant_id, event_id, status, amount, updated_at } = reservation;
  const sql = `
    UPDATE reservations
    SET participant_id = ?, event_id = ?, status = ?, amount = ?, updated_at = ?
    WHERE id = ?
  `;
  const params = [participant_id, event_id, status, amount, updated_at, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Hapus reservasi
const deleteReservation = (id, callback) => {
  const sql = "DELETE FROM reservations WHERE id = ?";
  db.run(sql, [id], (err) => {
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