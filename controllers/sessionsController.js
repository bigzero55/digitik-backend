const sessionModel = require("../models/sessionsModel");
const scannedModel = require("../models/scannedModel"); // Import model scanned

// Get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionModel.getAllSessions();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single session by ID
exports.getSessionById = async (req, res) => {
  const { id } = req.params;
  try {
    const session = await sessionModel.getSessionById(id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: "Session not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new session
exports.createSession = async (req, res) => {
  const session = req.body;
  try {
    const newSessionId = await sessionModel.createSession(session);
    res.status(201).json({ id: newSessionId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a session
exports.updateSession = async (req, res) => {
  const { id } = req.params;
  const session = req.body;
  try {
    await sessionModel.updateSession(id, session);
    res.json({ message: "Session updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a session and associated scanned records
exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  try {
    // Delete all scanned records related to the session
    await scannedModel.deleteScannedBySession(id);

    // Delete the session itself
    await sessionModel.deleteSession(id);

    res.json({
      message: "Session and related scanned records deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSessionsByEvent = (event_id) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM sessions WHERE event_id = ?",
      [event_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
