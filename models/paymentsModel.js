const db = require("./db");

// Tambah pembayaran baru
const addPayment = (payment, callback) => {
  const { user_id, reservation_id, payment_date, amount, status } = payment;
  const sql = `
    INSERT INTO payments (user_id, reservation_id, payment_date, amount, status)
    VALUES (?, ?, ?, ?,?)
  `;
  const params = [user_id, reservation_id, payment_date, amount, status ];
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
  const { payment_date, status  } = payment;
  const sql = `
    UPDATE payments
    SET payment_date = ?, status = ?
    WHERE id = ?
  `;
  const params = [ payment_date, status];
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