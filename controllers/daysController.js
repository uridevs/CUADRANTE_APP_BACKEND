// controllers/daysController.js
const { Day, Worker } = require('../db');

exports.createDay = async (req, res) => {
    try {
        const day = await Day.create(req.body);
        res.json(day);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDays = async (req, res) => {
    try {
        const days = await Day.findAll({ include: Worker });
        res.json(days);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
