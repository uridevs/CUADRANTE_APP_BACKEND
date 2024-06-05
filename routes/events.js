// routes/events.js
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

router.post('/', eventsController.createEvent);
router.get('/', eventsController.getEvents);

module.exports = router;
