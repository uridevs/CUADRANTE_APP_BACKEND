const { Worker } = require('../db');

exports.createWorker = async (req, res) => {
    try {
        const worker = await Worker.create(req.body);
        res.status(201).json(worker);
    } catch (error) {
        console.error('Error al crear el trabajador:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkers = async (req, res) => {
    try {
        const workers = await Worker.findAll();
        res.status(200).json(workers);
    } catch (error) {
        console.error('Error al obtener los trabajadores:', error);
        res.status(500).json({ error: error.message });
    }
};

