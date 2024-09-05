const db = require("./db");

class Participant {
  static create(participant, callback) {
    const { name, address, whatsapp, gender, additional_info } = participant;
    db.run(
      "INSERT INTO participants (name, address, whatsapp, gender, additional_info) VALUES (?, ?, ?, ?, ?)",
      [name, address, whatsapp, gender, JSON.stringify(additional_info)],
      function (err) {
        callback(err, this.lastID);
      }
    );
  }

  static findAll(callback) {
    db.all("SELECT * FROM participants", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static findById(id, callback) {
    db.get("SELECT * FROM participants WHERE id = ?", [id], (err, row) => {
      callback(err, row);
    });
  }

  static update(id, participant, callback) {
    const { name, address, whatsapp, gender, additional_info } = participant;
    db.run(
      "UPDATE participants SET name = ?, address = ?, whatsapp = ?, gender = ?, additional_info = ? WHERE id = ?",
      [name, address, whatsapp, gender, JSON.stringify(additional_info), id],
      (err) => {
        callback(err);
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM participants WHERE id = ?", [id], (err) => {
      callback(err);
    });
  }
}

module.exports = Participant;
