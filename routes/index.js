const express = require("express");
const router = express.Router();
const participantsRoutes = require("./participantsRoutes");
const usersRoutes = require("./usersRoutes");
const eventsRoutes = require("./eventsRoutes");
const reservationsRoutes = require("./reservationsRoutes");
const paymentsRoutes = require("./paymentsRoutes");
const sessionsRoutes = require("./sessionsRoutes");
const validatorsRoutes = require("./validatorsRoutes");
const scannedRoutes = require("./scannedRoutes");
const authRoutes = require("./authRoutes");

router.use("/participants", participantsRoutes);
router.use("/users", usersRoutes);
router.use("/events", eventsRoutes);
router.use("/reservations", reservationsRoutes);
router.use("/payments", paymentsRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/validators", validatorsRoutes);
router.use("/scanned", scannedRoutes);
router.use("/auth", authRoutes);

router.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
