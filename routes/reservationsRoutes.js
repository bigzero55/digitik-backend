const express = require("express");
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

// Endpoint untuk menambah reservation
router.post("/", reservationsController.addReservation);

// Endpoint untuk mendapatkan semua reservations
router.get("/", reservationsController.getAllReservations);

// Endpoint untuk mendapatkan reservation berdasarkan ID
router.get("/:id", reservationsController.getReservationById);

// Endpoint untuk mengupdate reservation
router.put("/:id", reservationsController.updateReservation);

// Endpoint untuk menghapus reservation
router.delete("/:id", reservationsController.deleteReservation);

module.exports = router;
