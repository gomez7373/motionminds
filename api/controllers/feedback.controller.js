const Daily = require('../models/daily.model');
const Session = require('../models/session.model');

const getFeedbackByDate = async (req, res) => {
    try {
        const userId = req.session.userId;
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

        // Retrieve daily data
        const dailyData = await Daily.find({
            user_id: userId,
            /* 
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
            */
        });

        // Retrieve session data
        const sessionData = await Session.find({
            user_id: userId,
            /* 
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
            */
        });
        res.status(200).json({
            dailyData,
            sessionData
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
};

module.exports = {
    getFeedbackByDate
};