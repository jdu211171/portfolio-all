const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/staff', staffController.webhookHandler);

module.exports = router;
