// controllers/workersController.js
const { Worker } = require('../db');

exports.createWorker = async (req, res) => {
    try {
        const worker = await Worker.create(req.body);
        res.json(worker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkers = async (req, res) => {
    try {
        const workers = await Worker.findAll();
        res.json(workers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
