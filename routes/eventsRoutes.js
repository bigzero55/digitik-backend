const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");
const { auth } = require("../middlewares/authMiddleware");

// Menambah event
router.post("/", auth, async (req, res) => {
  const { user_id, title, unix, description, date, price, capacity, location } =
    req.body;
  try {
    const newEventId = await eventsController.createEvent({
      user_id,
      title,
      unix,
      description,
      date,
      price,
      capacity,
      location,
    });
    res.status(201).json({ id: newEventId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add event" });
  }
});

// Mendapatkan semua event
router.get("/", async (req, res) => {
  try {
    const events = await eventsController.getAllEvents();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve events" });
  }
});

// Mendapatkan event berdasarkan ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const event = await eventsController.getEventById(id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve event" });
  }
});

// Mengupdate event
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { user_id, title, unix, description, date, price, capacity, location } =
    req.body;
  try {
    await eventsController.updateEvent(
      id,
      user_id,
      title,
      unix,
      description,
      date,
      price,
      capacity,
      location
    );
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

// Menghapus event
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eventsController.deleteEvent(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
