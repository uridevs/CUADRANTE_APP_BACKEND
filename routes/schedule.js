// routes/schedule.js
const express = require('express');
const router = express.Router();
const { createMonthSchedule } = require('../utils/schedule');
const { getMonthSchedule } = require('../controllers/scheduleController');

router.post('/month', async (req, res) => {
    const { year, month, startWorkerId } = req.body;
    try {
        await createMonthSchedule(year, month, startWorkerId);
        res.status(201).send('Month schedule created successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/month/:year/:month', getMonthSchedule);

module.exports = router;
