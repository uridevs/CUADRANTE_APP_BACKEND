const express = require('express');
const router = express.Router();
const daysController = require('../controllers/daysController');

router.post('/', daysController.createDay);
router.get('/', daysController.getDays);

module.exports = router;