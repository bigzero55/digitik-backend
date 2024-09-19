const db = require("./db");

// Tambah user baru
const addUser = (user, callback) => {
  const { username, email, password, full_name } = user;
  const sql = 
    "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)";
  const params = [username, email, password, full_name];
  
  db.execute(sql, params, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results.insertId);
    }
  });
};

// Dapatkan semua users
const getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  
  db.execute(sql, [], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// Dapatkan user berdasarkan ID
const getUserById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  
  db.execute(sql, [id], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Update data user
const updateUser = (id, user, callback) => {
  const { username, password, full_name } = user;
  const sql = 
    "UPDATE users SET username = ?, password = ?, full_name = ? WHERE id = ?";
  const params = [username, password, full_name, id];
  
  db.execute(sql, params, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

// Hapus user berdasarkan ID
const deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  
  db.execute(sql, [id], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};