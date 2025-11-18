const express = require('express')
const { login, signup } = require("../controllers/authController")

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
//router.post("/logout", logout); // to be implemented

module.exports = router;
