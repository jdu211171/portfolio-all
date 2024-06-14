const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

// Example route: GET /api/users
router.get('/', AdminController.getAllAdmins);

// Example route: POST /api/users
router.post('/', AdminController.createAdmin);

module.exports = router;
