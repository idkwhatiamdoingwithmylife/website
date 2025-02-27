// api/logVisitor.js

let visitLogs = []; // Logs stored in memory for this serverless instance

export default function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        // Return the logs
        res.status(200).json(visitLogs);
    } else if (method === 'POST') {
        // Log the incoming request's IP address and timestamp
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get IP address
        const timestamp = new Date().toISOString(); // Current timestamp

        // Store the log entry
        visitLogs.push({ ip, timestamp });

        res.status(200).json({ message: 'Logged successfully' });
    } else {
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
}
