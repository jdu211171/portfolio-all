const bcrypt = require('bcrypt');
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
      const { currentPassword, password, ...updateData } = req.body;
      if (password) {
        const admin = await AdminService.getAdminById(req.params.id);
        if (!admin || !(await bcrypt.compare(currentPassword, admin.password))) {
          return res.status(400).json({ error: '現在のパスワードを入力してください' });
        }
      }
      const updatedAdmin = await AdminService.updateAdmin(req.params.id, {
        ...updateData,
        password: password || undefined, // Обновляем пароль только если он предоставлен
      });
      res.status(200).json(updatedAdmin);
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
