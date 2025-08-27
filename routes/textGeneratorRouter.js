const express = require('express');
const { generateText, saveQueries, getRecentQueriesStack } = require('../controllers/textGeneratorController');
const router = express.Router();

router.post('/gen-text', generateText);
router.post('/save-quries', saveQueries)
router.get('/get-recentqueries-stack', getRecentQueriesStack)

module.exports = router;