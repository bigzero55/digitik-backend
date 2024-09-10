const usersModel = require("../model/usersModel");

// Controller untuk menambah user baru
const addUser = (req, res) => {
  const { username, password, full_name } = req.body;
  const newUser = { username, password, full_name };

  usersModel.addUser(newUser, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: "Gagal menambahkan user." });
    }
    res.status(201).json({ message: "User berhasil ditambahkan.", userId });
  });
};

// Controller untuk mendapatkan semua users
const getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: "Gagal mendapatkan users." });
    }
    res.status(200).json(users);
  });
};

// Controller untuk mendapatkan user berdasarkan ID
const getUserById = (req, res) => {
  const userId = req.params.id;

  usersModel.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Gagal mendapatkan user." });
    }
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan." });
    }
    res.status(200).json(user);
  });
};

// Controller untuk mengupdate user berdasarkan ID
const updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, password, full_name } = req.body;
  const updatedUser = { username, password, full_name };

  usersModel.updateUser(userId, updatedUser, (err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal mengupdate user." });
    }
    res.status(200).json({ message: "User berhasil diupdate." });
  });
};

// Controller untuk menghapus user berdasarkan ID
const deleteUser = (req, res) => {
  const userId = req.params.id;

  usersModel.deleteUser(userId, (err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal menghapus user." });
    }
    res.status(200).json({ message: "User berhasil dihapus." });
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};