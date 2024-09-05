const usersModel = require("../models/usersModel");

// Tambah user
exports.addUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  usersModel.addUser(username, password, role, (err, userId) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to add user", error: err.message });
    }
    res.status(201).json({
      message: "User added successfully",
      userId: userId,
    });
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  usersModel.getAllUsers((err, users) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve users", error: err.message });
    }
    res.status(200).json(users);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  usersModel.getUserById(id, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve user", error: err.message });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  });
};

// Update user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  usersModel.updateUser(id, username, password, role, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to update user", error: err.message });
    }
    res.status(200).json({ message: "User updated successfully" });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  usersModel.deleteUser(id, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to delete user", error: err.message });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
};
