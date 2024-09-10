const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventsController");

// Route untuk mendapatkan semua event
router.get("/events", eventController.getAllEvents);

// Route untuk mendapatkan event berdasarkan ID
router.get("/events/:id", eventController.getEventById);

// Route untuk membuat event baru
router.post("/events", eventController.createEvent);

// Route untuk mengupdate event berdasarkan ID
router.put("/events/:id", eventController.updateEvent);

// Route untuk menghapus event berdasarkan ID
router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;
