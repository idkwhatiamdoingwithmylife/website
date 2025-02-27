// api/viewCount.js

const { DateTime } = require('luxon');
let viewsData = {};
let totalViews = 0;

module.exports = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const currentTime = DateTime.now().toMillis();
    const oneHour = 60 * 60 * 1000;

    if (!viewsData[ip]) {
        viewsData[ip] = { lastViewed: 0 };
    }

    // Check if the IP has viewed the page in the last hour
    if (currentTime - viewsData[ip].lastViewed < oneHour) {
        // If within one hour, don't allow another view, but still allow viewing total views
        return res.status(200).json({ views: totalViews, message: 'View limit reached. Please try again later.' });
    } else {
        // If the IP is allowed to view the page, increment the total views and update the time
        viewsData[ip].lastViewed = currentTime;
        totalViews++;  // Increment the global total views count

        return res.status(200).json({ views: totalViews });
    }
};
