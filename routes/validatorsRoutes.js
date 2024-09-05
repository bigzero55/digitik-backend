const express = require("express");
const router = express.Router();
const validatorsController = require("../controllers/validatorsController");

// Validators routes
router.get("/", validatorsController.getAllValidators);
router.get("/:id", validatorsController.getValidatorById);
router.post("/", validatorsController.createValidator);
router.put("/:id", validatorsController.updateValidator);
router.delete("/:id", validatorsController.deleteValidator);

module.exports = router;
