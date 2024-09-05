const db = require("./db");

// Get all scanned records
exports.getAllScanned = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM scanned", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Get a single scanned record by ID
exports.getScannedById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM scanned WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Create a new scanned record
exports.createScanned = (scanned) => {
  const { scanTime, participant_id, validator_id, session_id } = scanned;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO scanned (scanTime, participant_id, validator_id, session_id) VALUES (?, ?, ?, ?)",
      [scanTime, participant_id, validator_id, session_id],
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

// Update a scanned record
exports.updateScanned = (id, scanned) => {
  const { scanTime, participant_id, validator_id, session_id } = scanned;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE scanned SET scanTime = ?, participant_id = ?, validator_id = ?, session_id = ? WHERE id = ?",
      [scanTime, participant_id, validator_id, session_id, id],
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

// Delete a scanned record
exports.deleteScanned = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM scanned WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.deleteScannedBySession = (session_id) => {
  return new Promise((resolve, reject) => {
    db.run(
      "DELETE FROM scanned WHERE session_id = ?",
      [session_id],
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
