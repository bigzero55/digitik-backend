const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Cek apakah header Authorization ada
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "No Authorization" });
  }

  // Pastikan token dalam format yang benar "Bearer <token>"
  const token = authHeader.split(" ")[1]; // Ambil token setelah kata "Bearer"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan user info dari token
    next(); // Lanjutkan ke route berikutnya
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
