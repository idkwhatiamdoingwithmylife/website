const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/', (req, res) => {
    const encodedMessage = req.body.message;

    if (!encodedMessage) {
        return res.status(400).send({ error: 'No message provided' });
    }

    try {
        const decodedMessage = Buffer.from(encodedMessage, 'base64').toString('utf-8');

        axios.post('https://discord.com/api/webhooks/1344439171258912788/1d-8GDD3yJO2JBTmAtGnS1UDGG-eBF5Hfr4g4mSroD4V21aCCTMzi4fBvzqmNpZlwMMP', {
            content: decodedMessage,
        })
        .then(response => {
            console.log('Message sent to Discord');
            res.send({ status: 'Message sent to Discord' });
        })
        .catch(error => {
            console.error('Error sending message to Discord:', error);
            res.status(500).send({ error: 'Error sending message to Discord' });
        });
    } catch (error) {
        console.error('Error decoding message:', error);
        res.status(400).send({ error: 'Error decoding message' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
