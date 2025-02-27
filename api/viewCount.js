const { DateTime } = require('luxon');
let viewsData = {};
let totalViews = 0;

module.exports = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const currentTime = DateTime.now().toMillis();
    const fiveMinutes = 5 * 60 * 1000;

    if (!viewsData[ip]) {
        viewsData[ip] = { lastViewed: 0 };
    }

    if (currentTime - viewsData[ip].lastViewed < fiveMinutes) {
        return res.status(200).json({ views: totalViews, message: 'View limit reached. Please try again later.' });
    } else {
        viewsData[ip].lastViewed = currentTime;
        totalViews++;
        return res.status(200).json({ views: totalViews });
    }
};
