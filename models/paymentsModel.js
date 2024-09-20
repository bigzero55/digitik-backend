const db = require("./db");

// Tambah pembayaran baru
const addPayment = (payment, callback) => {
  const { user_id, reservation_id, payment_date, amount, status } = payment;
  const sql = `
    INSERT INTO payments (user_id, reservation_id, payment_date, amount, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [user_id, reservation_id, payment_date, amount, status];
  db.execute(sql, params, (err, result) => {
    if (err) {
      err.message = "Gagal menambahkan pembayaran";
      err.code = "PAYMENT_ADD_FAILED";
      return callback(err, null);
    }
    callback(null, result ? result.insertId : null); // Mengembalikan ID pembayaran yang baru
  });
};

// Dapatkan semua pembayaran
const getAllPayments = (callback) => {
  const sql = "SELECT * FROM payments";
  db.execute(sql, [], (err, rows) => {
    if (err) {
      err.message = "Gagal mengambil data pembayaran";
      err.code = "PAYMENT_FETCH_FAILED";
      return callback(err, null);
    }
    callback(err, rows);
  });
};

// Dapatkan pembayaran berdasarkan ID
const getPaymentById = (id, callback) => {
  const sql = "SELECT * FROM payments WHERE id = ?";
  db.execute(sql, [id], (err, row) => {
    if (err) {
      err.message = "Gagal mengambil data pembayaran";
      err.code = "PAYMENT_FETCH_FAILED";
      return callback(err, null);
    }
    callback(err, row[0] || null); // MySQL2 mengembalikan array
  });
};

// Update data pembayaran
const updatePayment = (id, payment, callback) => {
  const { payment_date, status } = payment;
  const sql = `
    UPDATE payments
    SET payment_date = ?, status = ?
    WHERE id = ?
  `;
  const params = [payment_date, status, id];
  db.execute(sql, params, (err) => {
    if (err) {
      err.message = "Gagal mengupdate data pembayaran";
      err.code = "PAYMENT_UPDATE_FAILED";
      return callback(err);
    }
    callback(err);
  });
};

// Hapus pembayaran
const deletePayment = (id, callback) => {
  const sql = "DELETE FROM payments WHERE id = ?";
  db.execute(sql, [id], (err) => {
    if (err) {
      err.message = "Gagal menghapus data pembayaran";
      err.code = "PAYMENT_DELETE_FAILED";
      return callback(err);
    }
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
