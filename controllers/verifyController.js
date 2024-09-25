const verifyAccount = (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    db.execute(
      `UPDATE users SET verified = true, verification_token = NULL WHERE email = ? AND verification_token = ?`,
      [email, token],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            error: err.message,
            code: "DATABASE_ERROR",
          });
        }

        if (result.affectedRows === 0) {
          return res.status(400).json({
            message: "Invalid or expired token",
            code: "INVALID_TOKEN",
          });
        }

        res.json({ message: "Account verified successfully!" });
      }
    );
  } catch (err) {
    res.status(400).json({
      error: "Invalid or expired token",
      code: "INVALID_TOKEN",
    });
  }
};

module.exports = {
  verifyAccount,
};
