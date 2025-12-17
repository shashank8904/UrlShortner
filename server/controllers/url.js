const shortid = require('shortid');
const QRCode = require('qrcode');
const URL = require('../models/url');

async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' });

    const shortId = shortid.generate(); 
    await URL.create({
        shortId: shortId,
        redirectUrl: req.body.url,
        visitHistory: [],
    });
    return res.json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    
    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    
    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory 
    });
}

async function handleGenerateQRCode(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    
    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    
    const shortUrl = `http://localhost:3000/${shortId}`;
    
    try {
        // Generate QR code as data URL
        const qrCodeDataURL = await QRCode.toDataURL(shortUrl, {
            width: 300,
            margin: 2,
            color: {
                dark: '#667eea',
                light: '#ffffff'
            }
        });
        
        return res.json({ qrCode: qrCodeDataURL });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to generate QR code' });
    }
}

module.exports = {
    handleGenerateNewUrl,
    handleGetAnalytics,
    handleGenerateQRCode,
};