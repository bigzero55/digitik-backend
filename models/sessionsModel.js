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
  const {user_id, event_id, unix, name, description } = session;
  const sql =
    "INSERT INTO sessions (user_id, event_id, unix, name, description) VALUES (?, ?, ?,?, ?)";
  const params = [user_id, event_id, unix, name, description];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Update a session
const updateSession = (id, session, callback) => {
  const { name, description } = session;
  const sql =
    "UPDATE sessions SET name = ?, description = ? WHERE id = ?";
  const params = [name, description];
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
