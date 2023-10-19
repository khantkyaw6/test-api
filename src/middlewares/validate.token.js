const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const hasToken = req.headers.authorization;
  console.log(hasToken);
  if (!hasToken) {
    return res.status(401).json({ message: "Token is missing." });
  }
  const prefix = hasToken.split(" ")[0];
  if (prefix === "Bearer") {
    const token = hasToken.split(" ")[1];
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token format." });
    }
  }
};

module.exports = validateToken;
