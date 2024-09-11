const db = require("./db");

// Get all scanned records
const getAllScanned = (callback) => {
  const sql = "SELECT * FROM scanned";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Get a single scanned record by ID
const getScannedById = (id, callback) => {
  const sql = "SELECT * FROM scanned WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Create a new scanned record

const createScanned = (scanned, callback) => {
  const { participant_id, validator_id, session_id } = scanned;
  const sql =
    "INSERT INTO scanned (participant_id, validator_id, session_id) VALUES (?, ?, ?)";
  const params = [participant_id, validator_id, session_id];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Update a scanned record
const updateScanned = (id, scanned, callback) => {
  const { participant_id, validator_id, session_id } = scanned;
  const sql =
    "UPDATE scanned SET scanTime = ?, participant_id = ?, validator_id = ?, session_id = ? WHERE id = ?";
  const params = [scanTime, participant_id, validator_id, session_id, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Delete a scanned record
const deleteScanned = (id, callback) => {
  const sql = "DELETE FROM scanned WHERE id = ?";
  db.run(sql, [id], (err) => {
    callback(err);
  });
};

// Delete scanned records by session ID
const deleteScannedBySession = (session_id, callback) => {
  const sql = "DELETE FROM scanned WHERE session_id = ?";
  db.run(sql, [session_id], (err) => {
    callback(err);
  });
};

module.exports = {
  getAllScanned,
  getScannedById,
  createScanned,
  updateScanned,
  deleteScanned,
  deleteScannedBySession,
};
