const AdminService = require('../services/adminService');

class AdminController {
  static async create(req, res) {
    try {
      const admin = await AdminService.createAdmin(req.body);
      res.status(201).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const admin = await AdminService.getAdminById(req.params.id);
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const admin = await AdminService.updateAdmin(req.params.id, req.body);
      res.status(200).json(admin);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await AdminService.deleteAdmin(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AdminController;
