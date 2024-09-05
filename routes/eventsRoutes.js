const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

// Menambah event
router.post("/", (req, res) => {
  const { name, description, capacity, date } = req.body;
  eventsController.addEvent(
    name,
    description,
    capacity,
    date,
    (err, eventId) => {
      if (err) {
        return res.status(500).json({ error: "Failed to add event" });
      }
      res.status(201).json({ id: eventId });
    }
  );
});

// Mendapatkan semua event
router.get("/", (req, res) => {
  eventsController.getAllEvents((err, events) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve events" });
    }
    res.status(200).json(events);
  });
});

// Mendapatkan event berdasarkan ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  eventsController.getEventById(id, (err, event) => {
    if (err) {
      return res.status(500).json({ error: "Failed to retrieve event" });
    }
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  });
});

// Mengupdate event
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, capacity, date } = req.body;
  eventsController.updateEvent(id, name, description, capacity, date, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update event" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  });
});

// Menghapus event
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  eventsController.deleteEvent(id, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete event" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  });
});

module.exports = router;
