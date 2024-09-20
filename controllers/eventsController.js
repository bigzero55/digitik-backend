const eventModel = require("../models/eventsModel");
const scannedModel = require("../models/scannedModel");

// Controller untuk mendapatkan semua event
const getAllEvents = (req, res) => {
  eventModel.getAllEvents((err, events) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        code: err.code,
      });
    }
    return res.status(200).json(events);
  });
};

// Controller untuk mendapatkan event berdasarkan ID
const getEventById = (req, res) => {
  const id = req.params.id;
  eventModel.getEventById(id, (err, event) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        code: err.code,
      });
    }
    if (!event) {
      return res.status(404).json({
        error: "Event not found.",
        code: "EVENT_NOT_FOUND",
      });
    }
    return res.status(200).json(event);
  });
};

// Controller untuk membuat event baru
const createEvent = (req, res) => {
  const event = req.body;
  eventModel.addEvent(event, (err, newEventId) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        code: err.code,
      });
    }
    return res
      .status(201)
      .json({ message: "Event created successfully", id: newEventId });
  });
};

// Controller untuk mengupdate event
const updateEvent = (req, res) => {
  const id = req.params.id;
  const event = req.body;
  eventModel.updateEvent(id, event, (err) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        code: err.code,
      });
    }
    return res.status(200).json({ message: "Event updated successfully." });
  });
};

// Controller untuk menghapus event
const deleteEvent = (req, res) => {
  const id = req.params.id;

  // Dapatkan semua sesi yang terkait dengan event
  eventModel.getSessionsByEvent(id, (err, sessions) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        code: err.code,
      });
    }

    // Hapus semua scanned records terkait dengan sesi
    sessions.forEach((session) => {
      scannedModel.deleteScannedBySession(session.id, (err) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
            code: err.code,
          });
        }
      });
    });

    // Hapus semua sesi yang terkait dengan event
    eventModel.deleteSessionsByEvent(id, (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
          code: err.code,
        });
      }

      // Hapus event itu sendiri
      eventModel.deleteEvent(id, (err) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
            code: err.code,
          });
        }
        return res.status(200).json({
          message:
            "Event and related sessions and scanned records deleted successfully.",
        });
      });
    });
  });
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
