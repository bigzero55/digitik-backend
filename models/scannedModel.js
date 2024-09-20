const db = require("./db");

// Dapatkan semua catatan yang discan
const getAllScanned = (callback) => {
  const sql = "SELECT * FROM scanned";
  db.execute(sql, [], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data scan";
      err.code = "SCAN_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Dapatkan satu catatan yang discan berdasarkan ID
const getScannedById = (id, callback) => {
  const sql = "SELECT * FROM scanned WHERE id = ?";
  db.execute(sql, [id], (err, row) => {
    if (err) {
      err.message = "Gagal mengambil data scan";
      err.code = "SCAN_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, row[0] || null); // MySQL2 mengembalikan array
  });
};

// Buat catatan baru yang discan
const createScanned = (scanned, callback) => {
  const { participant_id, validator_id, session_id } = scanned;
  const sql =
    "INSERT INTO scanned (participant_id, validator_id, session_id) VALUES (?, ?, ?)";
  const params = [participant_id, validator_id, session_id];
  db.execute(sql, params, (err, result) => {
    if (err) {
      err.message = "Gagal menambahkan data scan";
      err.code = "SCAN_ADD_FAILED";
      return callback(err, null);
    }
    callback(null, result ? result.insertId : null); // Mengembalikan ID catatan yang baru
  });
};

// Update catatan yang discan
const updateScanned = (id, scanned, callback) => {
  const { participant_id, validator_id, session_id } = scanned;
  const sql =
    "UPDATE scanned SET participant_id = ?, validator_id = ?, session_id = ? WHERE id = ?";
  const params = [participant_id, validator_id, session_id, id];
  db.execute(sql, params, (err) => {
    if (err) {
      err.message = "Gagal mengupdate data scan";
      err.code = "SCAN_UPDATE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

// Hapus catatan yang discan
const deleteScanned = (id, callback) => {
  const sql = "DELETE FROM scanned WHERE id = ?";
  db.execute(sql, [id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data scan";
      err.code = "SCAN_DELETE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

// Hapus catatan yang discan berdasarkan ID sesi
const deleteScannedBySession = (session_id, callback) => {
  const sql = "DELETE FROM scanned WHERE session_id = ?";
  db.execute(sql, [session_id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data scan";
      err.code = "SCAN_DELETE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  getAllScanned,
  getScannedById,
  createScanned,
  updateScanned,
  deleteScanned,
  deleteScannedBySession,
};
