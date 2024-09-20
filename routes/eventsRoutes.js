const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventsController");

// Route untuk mendapatkan semua event
router.get("/", eventController.getAllEvents);

// Route untuk mendapatkan event berdasarkan ID
router.get("/:id", eventController.getEventById);

// Route untuk membuat event baru
router.post("/", eventController.createEvent);

// Route untuk mengupdate event berdasarkan ID
router.put("/:id", eventController.updateEvent);

// Route untuk menghapus event berdasarkan ID
router.delete("/:id", eventController.deleteEvent);

module.exports = router;
