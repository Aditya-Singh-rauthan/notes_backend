const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "ECOMMERCE_BACKEND";

exports.jwtToken = (req, res) => {
  const payload = {
    _id: userResult._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY);
  return token;
};

exports.jwtValidation = async (req, res) => {
  let token = req.headers["access-token"];
  if (!token) {
    return res.status(401).json({ message: "Token Verification Failed" });
  }
  jwt.verify(token, "Jwt Secret Key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};
