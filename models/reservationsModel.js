const db = require("./db");

// Tambah reservasi baru
const addReservation = (reservation, callback) => {
  const { user_id, participant_id, event_id, status, booking_code } =
    reservation;
  const sql = `
    INSERT INTO reservations (user_id, participant_id, event_id, status, booking_code)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [user_id, participant_id, event_id, status, booking_code];
  db.execute(sql, params, (err, result) => {
    if (err) {
      err.message = "Gagal menambahkan reservasi";
      err.code = "RESERVATION_ADD_FAILED";
      return callback(err, null);
    }
    callback(null, result ? result.insertId : null); // Mengembalikan ID reservasi yang baru
  });
};

// Dapatkan semua reservasi
const getAllReservations = (callback) => {
  const sql = "SELECT * FROM reservations";
  db.execute(sql, [], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data reservasi";
      err.code = "RESERVATION_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Dapatkan reservasi berdasarkan ID
const getReservationById = (id, callback) => {
  const sql = "SELECT * FROM reservations WHERE id = ?";
  db.execute(sql, [id], (err, row) => {
    if (err) {
      err.message = "Gagal mengambil data reservasi";
      err.code = "RESERVATION_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, row[0] || null); // MySQL2 mengembalikan array
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
  db.execute(sql, params, (err) => {
    if (err) {
      err.message = "Gagal mengupdate data reservasi";
      err.code = "RESERVATION_UPDATE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

// Hapus reservasi
const deleteReservation = (id, callback) => {
  const sql = "DELETE FROM reservations WHERE id = ?";
  db.execute(sql, [id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data reservasi";
      err.code = "RESERVATION_DELETE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  addReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
