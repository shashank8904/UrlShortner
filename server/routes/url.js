const express = require('express');
const { handleGenerateNewUrl, handleGetAnalytics, handleGenerateQRCode } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateNewUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
router.get('/qrcode/:shortId', handleGenerateQRCode);

module.exports = router;