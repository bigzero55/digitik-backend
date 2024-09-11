const scannedModel = require("../models/scannedModel");

// Get all scanned records
const getAllScanned = (req, res) => {
  scannedModel.getAllScanned((err, scannedRecords) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(scannedRecords);
    }
  });
};

// Get a single scanned record by ID
const getScannedById = (req, res) => {
  const { id } = req.params;
  scannedModel.getScannedById(id, (err, scannedRecord) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (scannedRecord) {
      res.json(scannedRecord);
    } else {
      res.status(404).json({ error: "Scanned record not found" });
    }
  });
};

// Create a new scanned record
const createScanned = (req, res) => {
  const scanned = req.body;
  scannedModel.createScanned(scanned, (err, newScannedId) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: newScannedId });
    }
  });
};

// Update a scanned record
const updateScanned = (req, res) => {
  const { id } = req.params;
  const scanned = req.body;
  scannedModel.updateScanned(id, scanned, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Scanned record updated successfully" });
    }
  });
};

// Delete a scanned record
const deleteScanned = (req, res) => {
  const { id } = req.params;
  scannedModel.deleteScanned(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: "Scanned record deleted successfully" });
    }
  });
};

module.exports = {
  getAllScanned,
  getScannedById,
  createScanned,
  updateScanned,
  deleteScanned,
};