const { Event, Day } = require('../db');

exports.createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll({ include: Day });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        res.status(500).json({ error: error.message });
    }
};

