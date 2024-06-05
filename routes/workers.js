// routes/workers.js
const express = require('express');
const router = express.Router();
const workersController = require('../controllers/workersController');

router.post('/', workersController.createWorker);
router.get('/', workersController.getWorkers);

module.exports = router;
