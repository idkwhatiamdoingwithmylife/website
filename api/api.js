module.exports = async (req, res) => {
  const encodedMessage = req.query.message;

  if (encodedMessage) {
    try {
      const decodedMessage = atob(encodedMessage);
      const messageParts = decodedMessage.split(": ");
      
      // Check if there are two parts and get the full URL
      const fullUrl = messageParts[1]; // Assuming the full URL is after the ": "

      // Check if the decoded message contains an embed (you can refine this condition)
      const isEmbedPresent = decodedMessage.includes('embed');

      const webhookUrl = 'https://discord.com/api/webhooks/1344439171258912788/1d-8GDD3yJO2JBTmAtGnS1UDGG-eBF5Hfr4g4mSroD4V21aCCTMzi4fBvzqmNpZlwMMP';

      // If embed is present, exclude it from the payload content
      const discordPayload = isEmbedPresent
        ? {
            content: `Reese Lo Visited: [${fullUrl}](${fullUrl})`
          }
        : {
            content: `Reese Lo Visited: [${fullUrl}](${fullUrl})`,
            embeds: [] // Explicitly ensure no embeds are sent
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
    } catch (error) {
      res.status(500).json({ error: 'Failed to decode Base64 message' });
    }
  } else {
    res.status(400).json({ error: 'No message provided' });
  }
};
