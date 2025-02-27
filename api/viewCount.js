// api/viewCount.js

const { DateTime } = require('luxon');
const viewsData = {}; // In-memory store for views. You can replace this with a database in production.

module.exports = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const currentTime = DateTime.now().toMillis(); // Get the current time in milliseconds
    const oneHour = 60 * 60 * 1000; // One hour in milliseconds

    if (!viewsData[ip]) {
        viewsData[ip] = { count: 0, lastViewed: 0 };
    }

    // Check if the IP has viewed the page in the last hour
    if (currentTime - viewsData[ip].lastViewed < oneHour) {
        // If within one hour, don't allow another view
        return res.status(200).json({ message: 'View limit reached. Please try again later.' });
    } else {
        // Allow view and update the time
        viewsData[ip].lastViewed = currentTime;
        viewsData[ip].count += 1;
        
        // In a real application, you would persist this count to a database instead of using in-memory data.

        return res.status(200).json({ views: viewsData[ip].count });
    }
};
