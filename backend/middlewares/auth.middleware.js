const jwt = require("jsonwebtoken");

// 🔐 Authentication Middleware
const authenticate = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        msg: "Access denied. No token provided."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user data to request
    req.user = decoded; // { id, role }

    next();

  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token"
    });
  }
};

module.exports = {authenticate};
