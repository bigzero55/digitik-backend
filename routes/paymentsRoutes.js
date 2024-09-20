const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

// Rute untuk menambah pembayaran baru
router.post("/", paymentsController.addPayment);

// Rute untuk mendapatkan semua pembayaran
router.get("/", paymentsController.getAllPayments);

// Rute untuk mendapatkan pembayaran berdasarkan ID
router.get("/:id", paymentsController.getPaymentById);

// Rute untuk mengupdate pembayaran berdasarkan ID
router.put("/:id", paymentsController.updatePayment);

// Rute untuk menghapus pembayaran berdasarkan ID
router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
