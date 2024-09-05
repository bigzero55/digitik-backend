const eventModel = require("../models/eventsModel");
const sessionModel = require("../models/sessionsModel");
const scannedModel = require("../models/scannedModel");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventModel.getEventById(id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const event = req.body;
  try {
    const newEventId = await eventModel.createEvent(event);
    res.status(201).json({ id: newEventId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;
  try {
    await eventModel.updateEvent(id, event);
    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an event and associated sessions and scanned records
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // Get all sessions related to the event
    const sessions = await sessionModel.getSessionsByEvent(id);

    // Delete all scanned records related to these sessions
    for (const session of sessions) {
      await scannedModel.deleteScannedBySession(session.id);
    }

    // Delete all sessions related to the event
    await sessionModel.deleteSessionsByEvent(id);

    // Delete the event itself
    await eventModel.deleteEvent(id);

    res.json({
      message:
        "Event and related sessions and scanned records deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
