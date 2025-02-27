module.exports = (req, res) => {
  const apiKey = req.query.apiKey || req.headers['x-api-key'];

  if (apiKey === '1234') {
    for (let i = 0; i < 100; i++) {
      console.log('hi');
    }
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
};
