const db = require("../models/db");

// Get all participants
exports.getAllParticipants = (req, res) => {
  db.all("SELECT * FROM participants", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get a single participant
exports.getParticipantById = (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM participants WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
};

// Create a new participant
exports.createParticipant = (req, res) => {
  const { name, address, whatsapp, gender } = req.body;
  const query =
    "INSERT INTO participants (name, address, whatsapp, gender) VALUES (?, ?, ?, ?)";
  db.run(query, [name, address, whatsapp, gender], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
};

// Update a participant
exports.updateParticipant = (req, res) => {
  const { id } = req.params;
  const { name, address, whatsapp, gender } = req.body;
  const query =
    "UPDATE participants SET name = ?, address = ?, whatsapp = ?, gender = ? WHERE id = ?";
  db.run(query, [name, address, whatsapp, gender, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Participant updated successfully" });
  });
};

// Delete a participant
exports.deleteParticipant = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM participants WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Participant deleted successfully" });
  });
};

// Add additional info for a participant
exports.addAdditionalInfo = (req, res) => {
  const { participant_id, size, transport_type, city } = req.body;
  const query =
    "INSERT INTO participants_additional_info (participant_id, size, transport_type, city) VALUES (?, ?, ?, ?)";
  db.run(query, [participant_id, size, transport_type, city], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
};

// Get additional info for a participant
exports.getAdditionalInfo = (req, res) => {
  const { participant_id } = req.params;
  db.get(
    "SELECT * FROM participants_additional_info WHERE participant_id = ?",
    [participant_id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    }
  );
};
