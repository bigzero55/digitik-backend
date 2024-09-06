const db = require("./db");

// Tambah payment
exports.addPayment = (reservationId, amount, status, paidAt, callback) => {
  const sql = `
    INSERT INTO payments (reservation_id, amount, status, paid_at)
    VALUES (?, ?, ?, ?)
  `;
  const params = [reservationId, amount, status, paidAt];
  db.run(sql, params, function (err) {
    if (err) {
      callback(err);
    } else {
      callback(null, this.lastID); // Mengembalikan ID pembayaran yang baru
    }
  });
};

// Ambil semua payments
exports.getAllPayments = (callback) => {
  const sql = "SELECT * FROM payments";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Ambil payment berdasarkan ID
exports.getPaymentById = (id, callback) => {
  const sql = "SELECT * FROM payments WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Update payment
exports.updatePayment = (
  id,
  reservationId,
  amount,
  status,
  paidAt,
  callback
) => {
  const sql = `
    UPDATE payments
    SET reservation_id = ?, amount = ?, status = ?, paid_at = ?
    WHERE id = ?
  `;
  const params = [reservationId, amount, status, paidAt, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Hapus payment
exports.deletePayment = (id, callback) => {
  const sql = "DELETE FROM payments WHERE id = ?";
  db.run(sql, [id], (err) => {
    callback(err);
  });
};
