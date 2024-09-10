const express = require('express');
const router = express.Router();
const participantsController = require('../controllers/participantsController');

// Route untuk menambah participant
router.post('/participants', participantsController.createParticipant);

// Route untuk mendapatkan semua participants
router.get('/participants', participantsController.getAllParticipants);

// Route untuk mendapatkan participant berdasarkan ID
router.get('/participants/:id', participantsController.getParticipantById);

// Route untuk mengupdate participant berdasarkan ID
router.put('/participants/:id', participantsController.updateParticipant);

// Route untuk menghapus participant berdasarkan ID
router.delete('/participants/:id', participantsController.deleteParticipant);

module.exports = router;