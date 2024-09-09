const express = require("express");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

// Import routes
const apiRoutes = require("./routes/index");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5000", // Atau gunakan '*' untuk mengizinkan semua origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Tentukan metode yang diizinkan
    credentials: true, // Jika perlu mengirim cookies
  })
);

// Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
