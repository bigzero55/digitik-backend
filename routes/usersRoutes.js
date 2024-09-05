const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Endpoint untuk menambah user
router.post("/", usersController.addUser);

// Endpoint untuk mendapatkan semua user
router.get("/", usersController.getAllUsers);

// Endpoint untuk mendapatkan user berdasarkan ID
router.get("/:id", usersController.getUserById);

// Endpoint untuk mengupdate user
router.put("/:id", usersController.updateUser);

// Endpoint untuk menghapus user
router.delete("/:id", usersController.deleteUser);

module.exports = router;
