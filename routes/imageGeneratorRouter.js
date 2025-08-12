const express = require('express');
const { generateImage } = require('../controllers/imageGeneratorController');
const router = express.Router();

router.post("/gen-image", generateImage);

module.exports = router;