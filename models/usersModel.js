const db = require("./db");

// Tambah user baru
const addUser = (user, callback) => {
  const { username, password, full_name } = user;
  const sql = "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)";
  const params = [username, password, full_name];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Dapatkan semua users
const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Dapatkan user berdasarkan ID
const getUserById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Update data user
const updateUser = (id, user, callback) => {
  const { username, password, full_name } = user;
  const sql = "UPDATE users SET username = ?, password = ?, full_name = ? WHERE id = ?";
  const params = [username, password, full_name, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Hapus user berdasarkan ID
const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.run(sql, [id], (err) => {
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