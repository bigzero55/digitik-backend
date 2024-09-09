const db = require("./db");

// Fungsi untuk menambah user
const addUser = (username, password, full_name, callback) => {
  const sql = `
    INSERT INTO users (username, password, full_name)
    VALUES (?, ?, ?)
  `;
  const params = [username, password, full_name];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Fungsi untuk mendapatkan semua users
const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getUserById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Fungsi untuk mengupdate user
const updateUser = (id, username, password, full_name, callback) => {
  const sql = `
    UPDATE users
    SET username = ?, password = ?, full_name = ?
    WHERE id = ?
  `;
  const params = [username, password, full_name, id];
  db.run(sql, params, function (err) {
    callback(err);
  });
};

// Fungsi untuk menghapus user
const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
