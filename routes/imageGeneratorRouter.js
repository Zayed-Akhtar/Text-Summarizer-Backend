const express = require('express');
const { generateImage, getExistingImages } = require('../controllers/imageGeneratorController');
const { authenticateUser } = require('../middlewares/authenticateUser');
const router = express.Router();

router.post("/gen-image", authenticateUser, generateImage);
router.get('/get-images', getExistingImages);
module.exports = router;