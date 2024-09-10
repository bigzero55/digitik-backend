const db = require("./db");

// Fungsi untuk menambah participant
const createParticipant = (participant, callback) => {
  const {user_id, name, unix, phone, email} = participant;
  const sql = `
    INSERT INTO participants (user_id, name, unix, phone, email)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params =[user_id, name, unix, phone, email];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Fungsi untuk mendapatkan semua participants
const getAllParticipants = (callback) => {
  const sql = "SELECT * FROM participants";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Fungsi untuk mendapatkan participant berdasarkan ID
const getParticipantById = (id, callback) => {
  const sql = "SELECT * FROM participants WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Fungsi untuk mengupdate participant
const updateParticipant = (id, participant, callback) => {
  const { name, phone, email } = participant;
  const sql = `
    UPDATE participants
    SET name = ?, phone = ?, email = ?
    WHERE id = ?
  `;
  const params = [name, phone, email, id];
  db.run(sql, params, function (err) {
    callback(err);
  });
};

// Fungsi untuk menghapus participant
const deleteParticipant = (id, callback) => {
  const sql = "DELETE FROM participants WHERE id = ?";
  db.run(sql, [id], function (err) {
    callback(err);
  });
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};