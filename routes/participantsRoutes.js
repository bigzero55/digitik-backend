const express = require("express");
const router = express.Router();
const participantsController = require("../controllers/participantsController");

// Participants routes
router.get("/", participantsController.getAllParticipants);
router.get("/:id", participantsController.getParticipantById);
router.post("/", participantsController.createParticipant);
router.put("/:id", participantsController.updateParticipant);
router.delete("/:id", participantsController.deleteParticipant);

// Additional info routes
router.post("/additional-info", participantsController.addAdditionalInfo);
router.get(
  "/additional-info/:participant_id",
  participantsController.getAdditionalInfo
);

module.exports = router;
