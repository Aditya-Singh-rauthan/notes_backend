require('dotenv').config()
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.jwtToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY);
  return token;
};

exports.jwtValidation = async (req, res,next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token Verification Failed" });
  }
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};
