// src/controllers/userController.js

const AdminService = require('../services/adminService');

const AdminController = {
  async getAllAdmins(req, res) {
    try {
      const users = await AdminService.getAllAdmins();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createAdmin(req, res) {
    const { username, email } = req.body;
    try {
      const newUser = await AdminService.createUser(username, email);
      res.json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = AdminController;
