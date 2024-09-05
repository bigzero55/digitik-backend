const db = require("./db");

// Get all validators
exports.getAllValidators = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM validators", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Get a single validator by ID
exports.getValidatorById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM validators WHERE id = ?", [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Create a new validator
exports.createValidator = (validator) => {
  const { name, user_id } = validator;
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO validators (name, user_id) VALUES (?, ?)",
      [name, user_id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Update a validator
exports.updateValidator = (id, validator) => {
  const { name, user_id } = validator;
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE validators SET name = ?, user_id = ? WHERE id = ?",
      [name, user_id, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

// Delete a validator
exports.deleteValidator = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM validators WHERE id = ?", [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
