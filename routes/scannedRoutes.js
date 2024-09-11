const express = require("express");
const router = express.Router();
const scannedController = require("../controllers/scannedController");

router.get("/", scannedController.getAllScanned);

router.get("/:id", scannedController.getScannedById);

router.post("/", scannedController.createScanned);

router.put("/:id", scannedController.updateScanned);

router.delete("/:id", scannedController.deleteScanned);

module.exports = router;