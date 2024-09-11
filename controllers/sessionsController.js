const sessionModel = require("../models/sessionsModel");
const scannedModel = require("../models/scannedModel");

// Mendapatkan semua sesi
const getAllSessions = (req, res) => {
  sessionModel.getAllSessions((err, sessions) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(sessions);
    }
  });
};

// Mendapatkan sesi berdasarkan ID
const getSessionById = (req, res) => {
  const { id } = req.params;
  sessionModel.getSessionById(id, (err, session) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!session) {
      res.status(404).json({ error: "Session not found" });
    } else {
      res.json(session);
    }
  });
};

// Membuat sesi baru
const createSession = (req, res) => {
  const session = req.body;
  sessionModel.createSession(session, (err, newSessionId) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: newSessionId });
    }
  });
};

// Memperbarui sesi berdasarkan ID
const updateSession = (req, res) => {
  const { id } = req.params;
  const session = req.body;
  sessionModel.updateSession(id, session, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Session updated successfully" });
    }
  });
};

// Menghapus sesi dan catatan yang terkait pada tabel 'scanned'
const deleteSession = (req, res) => {
  const { id } = req.params;
  scannedModel.deleteScannedBySession(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      sessionModel.deleteSession(id, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: "Session and related scanned records deleted successfully" });
        }
      });
    }
  });
};

// Menghapus semua sesi berdasarkan ID event
const deleteSessionsByEvent = (event_id, callback) => {
  sessionModel.deleteSessionsByEvent(event_id, callback);
};

// Export fungsi-fungsi sebagai variabel
module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  deleteSessionsByEvent,
};