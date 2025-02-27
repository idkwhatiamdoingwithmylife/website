// api/send-url.js
const axios = require('axios');

module.exports = async (req, res) => {
    // Only accept POST requests
    if (req.method === 'POST') {
        const { url } = req.body;

        // Validate URL
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        // Discord webhook URL
        const webhookUrl = 'https://discord.com/api/webhooks/1344439171258912788/1d-8GDD3yJO2JBTmAtGnS1UDGG-eBF5Hfr4g4mSroD4V21aCCTMzi4fBvzqmNpZlwMMP';

        try {
            // Send URL to Discord webhook
            await axios.post(webhookUrl, {
                content: `Website URL: ${url}`
            });
            return res.status(200).json({ message: 'URL sent to Discord webhook' });
        } catch (error) {
            console.error('Error sending to webhook:', error);
            return res.status(500).json({ message: 'Error sending URL to Discord' });
        }
    } else {
        // Handle method not allowed
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
