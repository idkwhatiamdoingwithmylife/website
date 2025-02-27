// api/logVisitor.js

let visitLogs = [];

export default function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        res.status(200).json(visitLogs);
    } else if (method === 'POST') {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const timestamp = new Date().toISOString();

        visitLogs.push({ ip, timestamp });

        res.status(200).json({ message: 'Logged successfully' });
    } else {
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
}
