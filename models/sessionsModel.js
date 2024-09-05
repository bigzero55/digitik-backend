const db = require("./db");

// Get all sessions
exports.getAllSessions = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM sessions", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Get a single session by ID
exports.getSessionById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM sessions WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Create a new session
exports.createSession = (session) => {
  const { event_id, unix, name, desc } = session;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO sessions (event_id, unix, name, desc) VALUES (?, ?, ?, ?)",
      [event_id, unix, name, desc],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Update a session
exports.updateSession = (id, session) => {
  const { event_id, unix, name, desc } = session;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE sessions SET event_id = ?, unix = ?, name = ?, desc = ? WHERE id = ?",
      [event_id, unix, name, desc, id],
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

// Delete a session
exports.deleteSession = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM sessions WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
