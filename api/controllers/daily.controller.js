const Daily = require('../models/daily.model');
const { validationResult } = require('express-validator');

// get all daily entries
const getDaily = async (req, res) => {
    try {
        const userId = req.session.userId;

        const dailyEntries = await Daily.find({ user_id: userId });
        res.status(200).json(dailyEntries);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// get a daily entry by id
const getDailyById = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;

        const dailyEntry = await Daily.findOne({ _id: id, user_id: userId });
        if (!dailyEntry) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }

        res.status(200).json(dailyEntry);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// get daily entries by date
const getDailyByDate = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { date } = req.params;

        const dailyEntries = await Daily.find({ user_id: userId, date: new Date(date) });
        if (dailyEntries.length === 0) {
            return res.status(404).json({ message: 'No daily entries found for this date' });
        }

        res.status(200).json(dailyEntries);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// create a new daily entry
const createDaily = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { date, tasks_completed } = req.body;

        const newDaily = new Daily({
            user_id: userId,
            date: date,
            tasks_completed: tasks_completed
        });

        const savedDaily = await newDaily.save();
        res.status(201).json({ message: 'Daily entry created successfully', daily: savedDaily });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// update a daily entry
const updateDaily = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;
        const { date, tasks_completed } = req.body;

        const daily = await Daily.findOne({ _id: id, user_id: userId });
        if (!daily) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }

        if (date !== undefined) {
            daily.date = date;
        }
        if (tasks_completed !== undefined) {
            daily.tasks_completed = tasks_completed;
        }

        const updatedDaily = await daily.save();
        res.status(200).json({ message: 'Daily entry updated successfully', daily: updatedDaily });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

// delete a daily entry
const deleteDaily = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { id } = req.params;

        const daily = await Daily.findOne({ _id: id, user_id: userId });
        if (!daily) {
            return res.status(404).json({ message: 'Daily entry not found' });
        }

        await daily.remove();
        res.status(200).json({ message: 'Daily entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

module.exports = {
    getDaily,
    getDailyById,
    getDailyByDate,
    createDaily,
    updateDaily,
    deleteDaily
}