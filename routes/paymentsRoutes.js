const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");

// Rute untuk menambah pembayaran dengan Midtrans
router.post("/add", paymentsController.addPayment);

// Rute untuk mendapatkan semua payments
router.get("/", paymentsController.getAllPayments);

// Rute untuk mendapatkan payment berdasarkan ID
router.get("/:id", paymentsController.getPaymentById);

// Rute untuk memperbarui payment
router.put("/:id", paymentsController.updatePayment);

// Rute untuk menghapus payment
router.delete("/:id", paymentsController.deletePayment);

module.exports = router;
