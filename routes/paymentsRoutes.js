const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

// Rute untuk menambah pembayaran baru
router.post("/payments", paymentsController.addPayment);

// Rute untuk mendapatkan semua pembayaran
router.get("/payments", paymentsController.getAllPayments);

// Rute untuk mendapatkan pembayaran berdasarkan ID
router.get("/payments/:id", paymentsController.getPaymentById);

// Rute untuk mengupdate pembayaran berdasarkan ID
router.put("/payments/:id", paymentsController.updatePayment);

// Rute untuk menghapus pembayaran berdasarkan ID
router.delete("/payments/:id", paymentsController.deletePayment);

module.exports = router;