const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");

// Import routes
const apiRoutes = require("./routes/index");

// Middleware
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
