// controllers/eventsController.js
const { Event, Day } = require('../db');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({ include: Day });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
