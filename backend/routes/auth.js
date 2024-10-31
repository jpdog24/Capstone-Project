// Import the jsonwebtoken library to work with JWTs
const jwt = require("jsonwebtoken");

// Middleware function to authenticate a token
const authenticateToken = (req, res, next) => {
  // Retrieve the 'authorization' header from the request

  // Extract the token from the authorization header
  // The expected format is "Bearer <token>"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // If no token is provided, respond with a 401 Unauthorized status
  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "tcmTM", (err, user) => {

     // If an error occurs during verification, respond with a 403 Forbidden status
    if (err) {
      return res.status(403).json(err);
    }
    req.user = user;

    // Call the next middleware or route handler in the stack
    next();
  });
};

// Export the authenticateToken function for use in other modules
module.exports = { authenticateToken };
