const { unauthorizedResposne } = require("../helpers/errorResponses");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log('this is session token', token);
  
  if (!token) {
    return unauthorizedResposne(res, "Unauthorized user, please login/signup");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('reached 403 error');
    
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = { authenticateUser };
