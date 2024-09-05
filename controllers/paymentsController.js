const paymentsModel = require("../models/paymentsModel");

// Tambah payment
exports.addPayment = (req, res) => {
  const { reservationId, amount, status, paidAt } = req.body;

  if (!reservationId || !amount || !status || !paidAt) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  paymentsModel.addPayment(
    reservationId,
    amount,
    status,
    paidAt,
    (err, paymentId) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to add payment", error: err.message });
      }
      res.status(201).json({
        message: "Payment added successfully",
        paymentId: paymentId,
      });
    }
  );
};

// Get all payments
exports.getAllPayments = (req, res) => {
  paymentsModel.getAllPayments((err, payments) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve payments", error: err.message });
    }
    res.status(200).json(payments);
  });
};

// Get payment by ID
exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  paymentsModel.getPaymentById(id, (err, payment) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve payment", error: err.message });
    }
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  });
};

// Update payment
exports.updatePayment = (req, res) => {
  const { id } = req.params;
  const { reservationId, amount, status, paidAt } = req.body;

  if (!reservationId || !amount || !status || !paidAt) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  paymentsModel.updatePayment(
    id,
    reservationId,
    amount,
    status,
    paidAt,
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to update payment", error: err.message });
      }
      res.status(200).json({ message: "Payment updated successfully" });
    }
  );
};

// Delete payment
exports.deletePayment = (req, res) => {
  const { id } = req.params;
  paymentsModel.deletePayment(id, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to delete payment", error: err.message });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  });
};
