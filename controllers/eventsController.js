const eventModel = require("../models/eventsModel");
const scannedModel = require("../models/scannedModel");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.createEvent = async (req, res) => {
  const event = req.body;
  try {
    const newEventId = await eventModel.addEvent(
      event.user_id,
      event.title,
      event.unix,
      event.description,
      event.date,
      event.price,
      event.capacity,
      event.location
    );
    res.status(201).json({ id: newEventId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;
  try {
    await eventModel.updateEvent(
      id,
      event.user_id,
      event.title,
      event.unix,
      event.description,
      event.date,
      event.price,
      event.capacity,
      event.location
    );
    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // Get all sessions related to the event
    const sessions = await eventModel.getSessionsByEvent(id);

    // Delete all scanned records related to these sessions
    for (const session of sessions) {
      await scannedModel.deleteScannedBySession(session.id);
    }

    // Delete all sessions related to the event
    await eventModel.deleteSessionsByEvent(id);

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