const sessionModel = require("../models/sessionsModel");
const scannedModel = require("../models/scannedModel");

// Mendapatkan semua sesi
const getAllSessions = (req, res) => {
  sessionModel.getAllSessions((err, sessions) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve sessions",
        error: err.message,
        code: err.code,
      });
    }
    res.json(sessions);
  });
};

// Mendapatkan sesi berdasarkan ID
const getSessionById = (req, res) => {
  const { id } = req.params;
  sessionModel.getSessionById(id, (err, session) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve session",
        error: err.message,
        code: err.code,
      });
    } else if (!session) {
      return res.status(404).json({
        message: "Session not found",
        code: "SESSION_NOT_FOUND",
      });
    }
    res.json(session);
  });
};

// Membuat sesi baru
const createSession = (req, res) => {
  const session = req.body;
  sessionModel.createSession(session, (err, newSessionId) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to create session",
        error: err.message,
        code: err.code,
      });
    }
    res.status(201).json({ id: newSessionId });
  });
};

// Memperbarui sesi berdasarkan ID
const updateSession = (req, res) => {
  const { id } = req.params;
  const session = req.body;
  sessionModel.updateSession(id, session, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update session",
        error: err.message,
        code: err.code,
      });
    }
    res.json({ message: "Session updated successfully" });
  });
};

// Menghapus sesi dan catatan yang terkait pada tabel 'scanned'
const deleteSession = (req, res) => {
  const { id } = req.params;
  scannedModel.deleteScannedBySession(id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete session",
        error: err.message,
        code: err.code,
      });
    } else {
      sessionModel.deleteSession(id, (err) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to delete session",
            error: err.message,
            code: err.code,
          });
        } else {
          res.json({
            message: "Session and related scanned records deleted successfully",
          });
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
