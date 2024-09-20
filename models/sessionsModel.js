const db = require("./db");

// Dapatkan semua sesi
const getAllSessions = (callback) => {
  const sql = "SELECT * FROM sessions";
  db.execute(sql, [], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data sesi";
      err.code = "SESSION_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Dapatkan satu sesi berdasarkan ID
const getSessionById = (id, callback) => {
  const sql = "SELECT * FROM sessions WHERE id = ?";
  db.execute(sql, [id], (err, row) => {
    if (err) {
      err.message = "Gagal mengambil data sesi";
      err.code = "SESSION_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, row[0] || null); // MySQL2 mengembalikan array
  });
};

// Buat sesi baru
const createSession = (session, callback) => {
  const { user_id, event_id, unix, name, description } = session;
  const sql =
    "INSERT INTO sessions (user_id, event_id, unix, name, description) VALUES (?, ?, ?, ?, ?)";
  const params = [user_id, event_id, unix, name, description];
  db.execute(sql, params, (err, result) => {
    if (err) {
      err.message = "Gagal menambahkan sesi";
      err.code = "SESSION_ADD_FAILED";
      return callback(err, null);
    }
    callback(null, result ? result.insertId : null); // Mengembalikan ID sesi yang baru
  });
};

// Update sesi
const updateSession = (id, session, callback) => {
  const { name, description } = session;
  const sql = "UPDATE sessions SET name = ?, description = ? WHERE id = ?";
  const params = [name, description, id];
  db.execute(sql, params, (err) => {
    if (err) {
      err.message = "Gagal mengupdate data sesi";
      err.code = "SESSION_UPDATE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

// Hapus sesi
const deleteSession = (id, callback) => {
  const sql = "DELETE FROM sessions WHERE id = ?";
  db.execute(sql, [id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data sesi";
      err.code = "SESSION_DELETE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};
