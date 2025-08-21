const express = require('express');
const { generateText } = require('../controllers/textGeneratorController');
const router = express.Router();

router.post('/gen-text', generateText);

module.exports = router;