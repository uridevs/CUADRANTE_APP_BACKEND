const express = require('express');
const { updatePassword, assignWorkerToUser } = require('../controllers/userController');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');


router.put('/update-password', authenticate, updatePassword);
router.put('/assign-worker', authenticate, isAdmin, assignWorkerToUser);

module.exports = router;