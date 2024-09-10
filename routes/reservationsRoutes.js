const express = require("express");
const reservationsController = require("../controllers/reservationsController");
const router = express.Router();

// Tambah reservasi baru
router.post("/reservations", reservationsController.createReservation);

// Dapatkan semua reservasi
router.get("/reservations", reservationsController.getAllReservations);

// Dapatkan reservasi berdasarkan ID
router.get("/reservations/:id", reservationsController.getReservationById);

// Update data reservasi
router.put("/reservations/:id", reservationsController.updateReservation);

// Hapus reservasi
router.delete("/reservations/:id", reservationsController.deleteReservation);

module.exports = router;