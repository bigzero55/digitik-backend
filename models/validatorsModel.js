const db = require("./db");

// Dapatkan semua validator
const getAllValidators = (callback) => {
  const sql = "SELECT * FROM validators";
  db.execute(sql, [], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data validator";
      err.code = "VALIDATOR_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, rows);
  });
};

// Dapatkan satu validator berdasarkan ID
const getValidatorById = (id, callback) => {
  const sql = "SELECT * FROM validators WHERE id = ?";
  db.execute(sql, [id], (err, row) => {
    if (err) {
      err.message = "Gagal mengambil data validator";
      err.code = "VALIDATOR_FETCH_FAILED";
      return callback(err, null);
    }
    callback(null, row[0] || null); // MySQL2 mengembalikan array
  });
};

// Buat validator baru
const createValidator = (validator, callback) => {
  const { name, user_id } = validator;
  const sql = "INSERT INTO validators (name, user_id) VALUES (?, ?)";
  const params = [name, user_id];
  db.execute(sql, params, (err, result) => {
    if (err) {
      err.message = "Gagal menambahkan validator";
      err.code = "VALIDATOR_ADD_FAILED";
      return callback(err, null);
    }
    callback(null, result ? result.insertId : null); // Mengembalikan ID validator yang baru
  });
};

// Update validator
const updateValidator = (id, validator, callback) => {
  const { name, user_id } = validator;
  const sql = "UPDATE validators SET name = ?, user_id = ? WHERE id = ?";
  const params = [name, user_id, id];
  db.execute(sql, params, (err) => {
    if (err) {
      err.message = "Gagal mengupdate data validator";
      err.code = "VALIDATOR_UPDATE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

// Hapus validator
const deleteValidator = (id, callback) => {
  const sql = "DELETE FROM validators WHERE id = ?";
  db.execute(sql, [id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data validator";
      err.code = "VALIDATOR_DELETE_FAILED";
      return callback(err);
    }
    callback(null);
  });
};

module.exports = {
  getAllValidators,
  getValidatorById,
  createValidator,
  updateValidator,
  deleteValidator,
};
