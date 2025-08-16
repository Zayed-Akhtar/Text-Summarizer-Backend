const express = require('express');
const { generateImage, getExistingImages } = require('../controllers/imageGeneratorController');
const router = express.Router();

router.post("/gen-image", generateImage);
router.get('/get-images', getExistingImages);
module.exports = router;