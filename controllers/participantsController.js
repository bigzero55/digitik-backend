const participantsModel = require('../models/participantsModel');

// Controller untuk menambah participant
const createParticipant = (req, res) => {
  const participant = req.body;
  participantsModel.createParticipant(participant, (err, participantId) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create participant." });
    }
    return res.status(201).json({ message: "Participant created successfully", participantId });
  });
};

// Controller untuk mendapatkan semua participants
const getAllParticipants = (req, res) => {
  participantsModel.getAllParticipants((err, participants) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve participants." });
    }
    return res.status(200).json(participants);
  });
};

// Controller untuk mendapatkan participant berdasarkan ID
const getParticipantById = (req, res) => {
  const id = req.params.id;
  participantsModel.getParticipantById(id, (err, participant) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve participant." });
    }
    if (!participant) {
      return res.status(404).json({ error: "Participant not found." });
    }
    return res.status(200).json(participant);
  });
};

// Controller untuk mengupdate participant
const updateParticipant = (req, res) => {
  const id = req.params.id;
  const updatedParticipant = req.body;
  participantsModel.updateParticipant(id, updatedParticipant, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update participant." });
    }
    return res.status(200).json({ message: "Participant updated successfully." });
  });
};

// Controller untuk menghapus participant
const deleteParticipant = (req, res) => {
  const id = req.params.id;
  participantsModel.deleteParticipant(id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete participant." });
    }
    return res.status(200).json({ message: "Participant deleted successfully." });
  });
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};