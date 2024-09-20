const express = require("express");
const reservationsController = require("../controllers/reservationsController");
const router = express.Router();

// Tambah reservasi baru
router.post("/", reservationsController.createReservation);

// Dapatkan semua reservasi
router.get("/", reservationsController.getAllReservations);

// Dapatkan reservasi berdasarkan ID
router.get("/:id", reservationsController.getReservationById);

// Update data reservasi
router.put("/:id", reservationsController.updateReservation);

// Hapus reservasi
router.delete("/:id", reservationsController.deleteReservation);

module.exports = router;
