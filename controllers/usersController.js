const usersModel = require("../models/usersModel");

// Controller untuk menambah user baru
const addUser = (req, res) => {
  const newUser = req.body;
  usersModel.addUser(newUser, (err, userId) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal menambahkan user.",
        error: err.message,
        code: err.code,
      });
    }
    res.status(201).json({ message: "User berhasil ditambahkan.", userId });
  });
};

// Controller untuk mendapatkan semua users
const getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mendapatkan users.",
        error: err.message,
        code: err.code,
      });
    }
    res.status(200).json(users);
  });
};

// Controller untuk mendapatkan user berdasarkan ID
const getUserById = (req, res) => {
  const userId = req.params.id;

  usersModel.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal mendapatkan user.",
        error: err.message,
        code: err.code,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
        code: "USER_NOT_FOUND",
      });
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
      return res.status(500).json({
        message: "Gagal mengupdate user.",
        error: err.message,
        code: err.code,
      });
    }
    res.status(200).json({ message: "User berhasil diupdate." });
  });
};

// Controller untuk menghapus user berdasarkan ID
const deleteUser = (req, res) => {
  const userId = req.params.id;

  usersModel.deleteUser(userId, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal menghapus user.",
        error: err.message,
        code: err.code,
      });
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
