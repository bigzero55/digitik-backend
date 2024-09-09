const eventModel = require("../models/eventsModel");
const scannedModel = require("../models/scannedModel");

// Helper function to convert callback-based methods to promises
const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

// Wrap eventModel methods with promisify
const getAllEvents = promisify(eventModel.getAllEvents);
const getEventById = promisify(eventModel.getEventById);
const addEvent = promisify(eventModel.addEvent);
const updateEvent = promisify(eventModel.updateEvent);
const deleteEvent = promisify(eventModel.deleteEvent);
const getSessionsByEvent = promisify(eventModel.getSessionsByEvent);
const deleteSessionsByEvent = promisify(eventModel.deleteSessionsByEvent);
const deleteScannedBySession = promisify(scannedModel.deleteScannedBySession);

exports.getAllEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await getEventById(id);
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
    const newEventId = await addEvent(
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
    await updateEvent(
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
    const sessions = await getSessionsByEvent(id);

    // Delete all scanned records related to these sessions
    for (const session of sessions) {
      await deleteScannedBySession(session.id);
    }

    // Delete all sessions related to the event
    await deleteSessionsByEvent(id);

    // Delete the event itself
    await deleteEvent(id);

    res.json({
      message:
        "Event and related sessions and scanned records deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
