const midtransClient = require("midtrans-client");
const paymentsModel = require("../models/paymentsModel");
require("dotenv").config();

// Buat instance Snap API Midtrans
let snap = new midtransClient.Snap({
  isProduction: process.env.M_PRODUCTION, // Ganti ke true jika di Production
  serverKey: process.env.M_SERVER_KEY, // Ambil serverKey dari .env
});

// Tambah payment dengan Midtrans
exports.addPayment = (req, res) => {
  const { reservationId, amount, status, paidAt, participantDetails } =
    req.body;

  if (!reservationId || !amount || !status || !paidAt || !participantDetails) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Buat parameter transaksi Midtrans
  let parameter = {
    transaction_details: {
      order_id: `reservation-${reservationId}`, // Menggunakan reservationId sebagai order_id
      gross_amount: amount,
    },
    customer_details: {
      first_name: participantDetails.first_name,
      last_name: participantDetails.last_name,
      email: participantDetails.email,
      phone: participantDetails.phone,
    },
    credit_card: {
      secure: true,
    },
  };

  // Buat transaksi Midtrans
  snap
    .createTransaction(parameter)
    .then((transaction) => {
      // Dapatkan token transaksi dari Midtrans
      let transactionToken = transaction.token;

      // Tambahkan payment ke database
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

          // Kirim respons ke frontend dengan token transaksi Midtrans
          res.status(201).json({
            message: "Payment added successfully",
            paymentId: paymentId,
            transactionToken: transactionToken, // Kirim token ke frontend
          });
        }
      );
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Failed to create transaction", error: err.message });
    });
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
