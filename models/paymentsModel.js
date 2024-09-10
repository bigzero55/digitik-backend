const db = require("./db");

// Tambah pembayaran baru
const addPayment = (payment, callback) => {
  const { reservation_id, amount, status, paid_at } = payment;
  const sql = `
    INSERT INTO payments (reservation_id, amount, status, paid_at)
    VALUES (?, ?, ?, ?)
  `;
  const params = [reservation_id, amount, status, paid_at];
  db.run(sql, params, function (err) {
    callback(err, this.lastID); // Mengembalikan ID pembayaran yang baru
  });
};

// Dapatkan semua pembayaran
const getAllPayments = (callback) => {
  const sql = "SELECT * FROM payments";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Dapatkan pembayaran berdasarkan ID
const getPaymentById = (id, callback) => {
  const sql = "SELECT * FROM payments WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Update data pembayaran
const updatePayment = (id, payment, callback) => {
  const { reservation_id, amount, status, paid_at } = payment;
  const sql = `
    UPDATE payments
    SET reservation_id = ?, amount = ?, status = ?, paid_at = ?
    WHERE id = ?
  `;
  const params = [reservation_id, amount, status, paid_at, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Hapus pembayaran
const deletePayment = (id, callback) => {
  const sql = "DELETE FROM payments WHERE id = ?";
  db.run(sql, [id], (err) => {
    callback(err);
  });
};

module.exports = {
  addPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};