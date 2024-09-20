const validatorsModel = require("../models/validatorsModel");

// Get all validators
exports.getAllValidators = async (req, res) => {
  try {
    const validators = await validatorsModel.getAllValidators();
    res.json(validators);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve validators",
      error: err.message,
      code: err.code,
    });
  }
};

// Get a single validator by ID
exports.getValidatorById = async (req, res) => {
  const { id } = req.params;
  try {
    const validator = await validatorsModel.getValidatorById(id);
    if (validator) {
      res.json(validator);
    } else {
      res.status(404).json({
        message: "Validator not found",
        code: "VALIDATOR_NOT_FOUND",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve validator",
      error: err.message,
      code: err.code,
    });
  }
};

// Create a new validator
exports.createValidator = async (req, res) => {
  const validator = req.body;
  try {
    const newValidatorId = await validatorsModel.createValidator(validator);
    res.status(201).json({ id: newValidatorId });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create validator",
      error: err.message,
      code: err.code,
    });
  }
};

// Update a validator
exports.updateValidator = async (req, res) => {
  const { id } = req.params;
  const validator = req.body;
  try {
    await validatorsModel.updateValidator(id, validator);
    res.json({ message: "Validator updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update validator",
      error: err.message,
      code: err.code,
    });
  }
};

// Delete a validator
exports.deleteValidator = async (req, res) => {
  const { id } = req.params;
  try {
    await validatorsModel.deleteValidator(id);
    res.json({ message: "Validator deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete validator",
      error: err.message,
      code: err.code,
    });
  }
};
