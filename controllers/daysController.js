const { Day, Worker } = require('../db');

exports.createDay = async (req, res) => {
    try {
        const day = await Day.create(req.body);
        res.status(201).json(day);
    } catch (error) {
        console.error('Error al crear el día:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getDays = async (req, res) => {
    try {
        const days = await Day.findAll({ include: Worker });
        res.status(200).json(days);
    } catch (error) {
        console.error('Error al obtener los días:', error);
        res.status(500).json({ error: error.message });
    }
};

