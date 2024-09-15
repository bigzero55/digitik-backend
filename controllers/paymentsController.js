const midtransClient = require("midtrans-client");
const paymentsModel = require("../models/paymentsModel");
require("dotenv").config();

let snap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === "production",
  serverKey: process.env.M_SERVER_KEY, // Ambil serverKey dari .env
});

const addPayment = (req, res) => {
  const { user_id, reservation_id, amount, payment_date, status, participantDetails } = req.body;

  if (!user_id || !reservation_id || !amount || !payment_date || !status || !participantDetails) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  let parameter = {
    transaction_details: {
      order_id: `reservation-${reservation_id}`,
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

  snap.createTransaction(parameter)
    .then((transaction) => {
      let transactionToken = transaction.token;
      const newPayment = {
        user_id,
        reservation_id,
        payment_date,
        amount,
        status,
      };

      paymentsModel.addPayment(newPayment, (err, paymentId) => {
        if (err) {
          return res.status(500).json({ message: "Failed to add payment", error: err.message });
        }

        res.status(201).json({
          message: "Payment added successfully",
          paymentId: paymentId,
          transactionToken: transactionToken, 
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create transaction", error: err.message });
    });
};

const getAllPayments = (req, res) => {
  paymentsModel.getAllPayments((err, payments) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve payments", error: err.message });
    }
    res.status(200).json(payments);
  });
};

const getPaymentById = (req, res) => {
  const { id } = req.params;
  paymentsModel.getPaymentById(id, (err, payment) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve payment", error: err.message });
    }
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  });
};

const updatePayment = (req, res) => {
  const { id } = req.params;
  const { payment_date, status } = req.body;

  if (!payment_date || !status) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const updatedPayment = {
    payment_date,
    status,
  };

  paymentsModel.updatePayment(id, updatedPayment, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update payment", error: err.message });
    }
    res.status(200).json({ message: "Payment updated successfully" });
  });
};

const deletePayment = (req, res) => {
  const { id } = req.params;
  paymentsModel.deletePayment(id, (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete payment", error: err.message });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  });
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};