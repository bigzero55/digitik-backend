const scannedModel = require("../models/scannedModel");

// Get all scanned records
const getAllScanned = (req, res) => {
  scannedModel.getAllScanned((err, scannedRecords) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve scanned records",
        error: err.message,
        code: err.code,
      });
    }
    res.json(scannedRecords);
  });
};

// Get a single scanned record by ID
const getScannedById = (req, res) => {
  const { id } = req.params;
  scannedModel.getScannedById(id, (err, scannedRecord) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve scanned record",
        error: err.message,
        code: err.code,
      });
    }
    if (!scannedRecord) {
      return res.status(404).json({
        message: "Scanned record not found",
        code: "SCAN_NOT_FOUND",
      });
    }
    res.json(scannedRecord);
  });
};

// Create a new scanned record
const createScanned = (req, res) => {
  const scanned = req.body;
  scannedModel.createScanned(scanned, (err, newScannedId) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to create scanned record",
        error: err.message,
        code: err.code,
      });
    }
    res.status(201).json({ id: newScannedId });
  });
};

// Update a scanned record
const updateScanned = (req, res) => {
  const { id } = req.params;
  const scanned = req.body;
  scannedModel.updateScanned(id, scanned, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update scanned record",
        error: err.message,
        code: err.code,
      });
    }
    res.json({ message: "Scanned record updated successfully" });
  });
};

// Delete a scanned record
const deleteScanned = (req, res) => {
  const { id } = req.params;
  scannedModel.deleteScanned(id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete scanned record",
        error: err.message,
        code: err.code,
      });
    }
    res.json({ message: "Scanned record deleted successfully" });
  });
};

module.exports = {
  getAllScanned,
  getScannedById,
  createScanned,
  updateScanned,
  deleteScanned,
};
