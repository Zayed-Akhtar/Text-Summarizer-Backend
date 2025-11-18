const express = require('express');
const { generateText, saveQueries, getRecentQueriesStack } = require('../controllers/textGeneratorController');
const { authenticateUser } = require('../middlewares/authenticateUser');
const router = express.Router();

router.post('/gen-text',authenticateUser, generateText);
router.post('/save-quries',authenticateUser, saveQueries)
router.get('/get-recentqueries-stack', getRecentQueriesStack)

module.exports = router;