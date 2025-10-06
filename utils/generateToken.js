const jwt = require('jsonwebtoken');
require("dotenv").config();

const generateToken = (user)=>{
    return jwt.sign({email:user.email, id:user._id}, process.env.JWTSECRET_KEY, {expiresIn:'60m'})
}

module.exports.generateToken = generateToken;