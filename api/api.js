module.exports = async (req, res) => {
  const encodedMessage = req.query.message;
  const apiKeyBinary = req.query.apiKey;

  const expectedApiKeyBinary = '00110001 00110010 00110011 00110100';

  if (apiKeyBinary === expectedApiKeyBinary && encodedMessage) {
    try {
      const decodedMessage = atob(encodedMessage);

      const webhookUrl = 'https://discord.com/api/webhooks/1344439171258912788/1d-8GDD3yJO2JBTmAtGnS1UDGG-eBF5Hfr4g4mSroD4V21aCCTMzi4fBvzqmNpZlwMMP';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: decodedMessage }),
      });

      if (response.ok) {
        res.status(200).json({ message: 'Message sent to Discord webhook successfully!' });
      } else {
        res.status(500).json({ error: 'Failed to send message to Discord webhook' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to decode Base64 message' });
    }
  } else {
    res.status(403).json({ error: 'Invalid API Key or Missing Message' });
  }
};
