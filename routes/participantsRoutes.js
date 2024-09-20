const express = require("express");
const router = express.Router();
const participantsController = require("../controllers/participantsController");

// Route untuk menambah participant
router.post("/", participantsController.createParticipant);

// Route untuk mendapatkan semua participants
router.get("/", participantsController.getAllParticipants);

// Route untuk mendapatkan participant berdasarkan ID
router.get("/:id", participantsController.getParticipantById);

// Route untuk mengupdate participant berdasarkan ID
router.put("/:id", participantsController.updateParticipant);

// Route untuk menghapus participant berdasarkan ID
router.delete("/:id", participantsController.deleteParticipant);

module.exports = router;
