const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

// Endpoint untuk menambah payment
router.post("/", paymentsController.addPayment);

// Endpoint untuk mendapatkan semua payments
router.get("/", paymentsController.getAllPayments);

// Endpoint untuk mendapatkan payment berdasarkan ID
router.get("/:id", paymentsController.getPaymentById);

// Endpoint untuk mengupdate payment
router.put("/:id", paymentsController.updatePayment);

// Endpoint untuk menghapus payment
router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
