const reservationsModel = require("../models/reservationsModel");

// Tambah reservasi baru
const createReservation = (req, res) => {
  const newReservation = req.body
  reservationsModel.addReservation(newReservation, (err, reservationId) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create reservation" });
    }
    res.status(201).json({ message: "Reservation created", reservationId });
  });
};

// Dapatkan semua reservasi
const getAllReservations = (req, res) => {
  reservationsModel.getAllReservations((err, reservations) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve reservations" });
    }
    res.status(200).json(reservations);
  });
};

// Dapatkan reservasi berdasarkan ID
const getReservationById = (req, res) => {
  const id = req.params.id;
  reservationsModel.getReservationById(id, (err, reservation) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve reservation" });
    }
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.status(200).json(reservation);
  });
};

// Update data reservasi
const updateReservation = (req, res) => {
  const id = req.params.id;
  const updatedReservation = req.body

  reservationsModel.updateReservation(id, updatedReservation, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update reservation" });
    }
    res.status(200).json({ message: "Reservation updated successfully" });
  });
};

// Hapus reservasi
const deleteReservation = (req, res) => {
  const id = req.params.id;
  reservationsModel.deleteReservation(id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete reservation" });
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
  });
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};