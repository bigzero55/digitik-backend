const scannedModel = require("../models/scannedModel");

// Get all scanned records
exports.getAllScanned = async (req, res) => {
  try {
    const scannedRecords = await scannedModel.getAllScanned();
    res.json(scannedRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single scanned record by ID
exports.getScannedById = async (req, res) => {
  const { id } = req.params;
  try {
    const scannedRecord = await scannedModel.getScannedById(id);
    if (scannedRecord) {
      res.json(scannedRecord);
    } else {
      res.status(404).json({ error: "Scanned record not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new scanned record
exports.createScanned = async (req, res) => {
  const scanned = req.body;
  try {
    const newScannedId = await scannedModel.createScanned(scanned);
    res.status(201).json({ id: newScannedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a scanned record
exports.updateScanned = async (req, res) => {
  const { id } = req.params;
  const scanned = req.body;
  try {
    await scannedModel.updateScanned(id, scanned);
    res.json({ message: "Scanned record updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a scanned record
exports.deleteScanned = async (req, res) => {
  const { id } = req.params;
  try {
    await scannedModel.deleteScanned(id);
    res.json({ message: "Scanned record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
