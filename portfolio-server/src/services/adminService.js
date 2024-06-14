// src/services/adminService.js

const { db } = require('../models'); // Importing the db object which includes all models

const AdminService = {
  async getAllAdmins() {
    try {
      const admins = await db.Admin.findAll();
      return admins;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error; // Propagate the error
    }
  },

  async createAdmin(username, email) {
    try {
      const newAdmin = await db.Admin.create({ username, email });
      console.log('New admin created:', newAdmin);
      return newAdmin;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error; // Propagate the error
    }
  }
};

module.exports = AdminService;
