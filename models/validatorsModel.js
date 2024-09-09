const db = require("./db");

// Get all validators
const getAllValidators = (callback) => {
  const sql = "SELECT * FROM validators";
  db.all(sql, [], (err, rows) => {
    callback(err, rows);
  });
};

// Get a single validator by ID
const getValidatorById = (id, callback) => {
  const sql = "SELECT * FROM validators WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// Create a new validator
const createValidator = (validator, callback) => {
  const { name, user_id } = validator;
  const sql = "INSERT INTO validators (name, user_id) VALUES (?, ?)";
  const params = [name, user_id];
  db.run(sql, params, function (err) {
    callback(err, this.lastID);
  });
};

// Update a validator
const updateValidator = (id, validator, callback) => {
  const { name, user_id } = validator;
  const sql = "UPDATE validators SET name = ?, user_id = ? WHERE id = ?";
  const params = [name, user_id, id];
  db.run(sql, params, (err) => {
    callback(err);
  });
};

// Delete a validator
const deleteValidator = (id, callback) => {
  const sql = "DELETE FROM validators WHERE id = ?";
  db.run(sql, [id], (err) => {
    callback(err);
  });
};

module.exports = {
  getAllValidators,
  getValidatorById,
  createValidator,
  updateValidator,
  deleteValidator,
};
