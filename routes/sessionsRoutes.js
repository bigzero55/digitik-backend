const express = require("express");
const router = express.Router();
const sessionsController = require("../controllers/sessionsController");

// Route untuk mendapatkan semua sesi
router.get("/", sessionsController.getAllSessions);

// Route untuk mendapatkan sesi berdasarkan ID
router.get("/:id", sessionsController.getSessionById);

// Route untuk membuat sesi baru
router.post("/", sessionsController.createSession);

// Route untuk memperbarui sesi berdasarkan ID
router.put("/:id", sessionsController.updateSession);

// Route untuk menghapus sesi dan data scanned yang terkait berdasarkan ID sesi
router.delete("/:id", sessionsController.deleteSession);

module.exports = router;