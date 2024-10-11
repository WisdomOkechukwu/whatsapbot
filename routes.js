// routes.js
const express = require('express');
const { sendMessage } = require('./bot');
const router = express.Router();

// POST route to send a message
router.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    // Validate request body
    if (!number || !message) {
        return res.status(400).json({ error: 'Please provide both number and message.' });
    }

    try {
        await sendMessage(number, message);
        res.status(200).json({ success: true, message: 'Message sent!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message.', error });
    }
});

module.exports = router;
