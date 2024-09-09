const db = require("./db");

// Fungsi untuk menambah payment
const addPayment = (reservationId, amount, status, paidAt, callback) => {
  const sql = `
    INSERT INTO payments (reservation_id, amount, status, paid_at)
    VALUES (?, ?, ?, ?)
  `;
  const params = [reservationId, amount, status, paidAt];
  db.run(sql, params, function (err) {
    callback(err, this.lastID); // Mengembalikan ID pembayaran yang baru
  });
};

// Fungsi untuk mendapatkan semua payments
const getAllPayments = (callback) => {
  const sql = "SELECT * FROM payments";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Fungsi untuk mendapatkan payment berdasarkan ID
const getPaymentById = (id, callback) => {
  const sql = "SELECT * FROM payments WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Fungsi untuk mengupdate payment
const updatePayment = (id, reservationId, amount, status, paidAt, callback) => {
  const sql = `
    UPDATE payments
    SET reservation_id = ?, amount = ?, status = ?, paid_at = ?
    WHERE id = ?
  `;
  const params = [reservationId, amount, status, paidAt, id];
  db.run(sql, params, function (err) {
    callback(err);
  });
};

// Fungsi untuk menghapus payment
const deletePayment = (id, callback) => {
  const sql = "DELETE FROM payments WHERE id = ?";
  db.run(sql, [id], function (err) {
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
