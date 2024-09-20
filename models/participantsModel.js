const db = require("./db");

// Fungsi untuk menambah participant
const createParticipant = (participant, callback) => {
  const { user_id, name, unix, phone, email } = participant;

  // Cek apakah email atau nomor telepon sudah ada
  const checkSql = `
    SELECT * FROM participants WHERE email = ? OR phone = ?
  `;
  const checkParams = [email, phone];

  db.execute(checkSql, checkParams, (err, rows) => {
    if (err) {
      err.message = "Gagal menjalankan query database";
      err.code = "DATABASE_ERROR";
      return callback(err, null);
    }

    // Jika sudah ada, tolak pembuatan participant
    if (rows.length > 0) {
      const error = new Error();
      error.message = "Email atau nomor telepon sudah ada";
      error.code = "EMAIL_PHONE_EXISTS";
      return callback(error, null);
    }

    // Jika tidak ada, lanjutkan dengan pembuatan participant
    const sql = `
      INSERT INTO participants (user_id, name, unix, phone, email)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [user_id, name, unix, phone, email];
    db.execute(sql, params, (err, result) => {
      if (err) {
        err.message = "Gagal menambahkan participant ke database";
        err.code = "PARTICIPANT_CREATION_FAILED";
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  });
};

// Fungsi untuk mendapatkan semua participants
const getAllParticipants = (callback) => {
  const sql = "SELECT * FROM participants";
  db.execute(sql, [], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data participants dari database";
      err.code = "PARTICIPANTS_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Fungsi untuk mendapatkan participant berdasarkan ID
const getParticipantById = (id, callback) => {
  const sql = "SELECT * FROM participants WHERE id = ?";
  db.execute(sql, [id], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data participant dari database";
      err.code = "PARTICIPANT_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, rows[0] || null); // Mengambil peserta pertama jika ada
  });
};

// Fungsi untuk mengupdate participant
const updateParticipant = (id, participant, callback) => {
  const { name, phone, email } = participant;
  const sql = `
    UPDATE participants
    SET name = ?, phone = ?, email = ?
    WHERE id = ?
  `;
  const params = [name, phone, email, id];
  db.execute(sql, params, (err) => {
    if (err) {
      err.message = "Gagal mengupdate data participant";
      err.code = "PARTICIPANT_UPDATE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

// Fungsi untuk menghapus participant
const deleteParticipant = (id, callback) => {
  const sql = "DELETE FROM participants WHERE id = ?";
  db.execute(sql, [id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data participant";
      err.code = "PARTICIPANT_DELETE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};
