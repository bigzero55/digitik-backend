const reservationsModel = require("../models/reservationsModel");

// Tambah reservation
exports.addReservation = (req, res) => {
  const { participantId, eventId, status, amount, createdAt } = req.body;

  if (!participantId || !eventId || !status || !amount || !createdAt) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  reservationsModel.addReservation(
    participantId,
    eventId,
    status,
    amount,
    createdAt,
    (err, reservationId) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to add reservation", error: err.message });
      }
      res.status(201).json({
        message: "Reservation added successfully",
        reservationId: reservationId,
      });
    }
  );
};

// Get all reservations
exports.getAllReservations = (req, res) => {
  reservationsModel.getAllReservations((err, reservations) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve reservations",
        error: err.message,
      });
    }
    res.status(200).json(reservations);
  });
};

// Get reservation by ID
exports.getReservationById = (req, res) => {
  const { id } = req.params;
  reservationsModel.getReservationById(id, (err, reservation) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve reservation",
        error: err.message,
      });
    }
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json(reservation);
  });
};

// Update reservation
exports.updateReservation = (req, res) => {
  const { id } = req.params;
  const { participantId, eventId, status, amount, updatedAt } = req.body;

  if (!participantId || !eventId || !status || !amount || !updatedAt) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  reservationsModel.updateReservation(
    id,
    participantId,
    eventId,
    status,
    amount,
    updatedAt,
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to update reservation",
          error: err.message,
        });
      }
      res.status(200).json({ message: "Reservation updated successfully" });
    }
  );
};

// Delete reservation
exports.deleteReservation = (req, res) => {
  const { id } = req.params;
  reservationsModel.deleteReservation(id, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to delete reservation", error: err.message });
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
  });
};
