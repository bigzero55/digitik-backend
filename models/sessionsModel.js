const db = require("./db");

// Get all sessions
const getAllSessions = (callback) => {
  const sql = "SELECT * FROM sessions";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Get a single session by ID
const getSessionById = (id, callback) => {
  const sql = "SELECT * FROM sessions WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Create a new session
const createSession = (session, callback) => {
  const { event_id, unix, name, desc } = session;
  const sql =
    "INSERT INTO sessions (event_id, unix, name, desc) VALUES (?, ?, ?, ?)";
  const params = [event_id, unix, name, desc];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Update a session
const updateSession = (id, session, callback) => {
  const { event_id, unix, name, desc } = session;
  const sql =
    "UPDATE sessions SET event_id = ?, unix = ?, name = ?, desc = ? WHERE id = ?";
  const params = [event_id, unix, name, desc, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Delete a session
const deleteSession = (id, callback) => {
  const sql = "DELETE FROM sessions WHERE id = ?";
  db.run(sql, [id], (err) => {
    callback(err);
  });
};

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
};
