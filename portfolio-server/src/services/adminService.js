const { Admin } = require('../models');
class AdminService {
  static async createAdmin(data) {
    return await Admin.create(data);
  }

  static async getAdminById(id) {
    return await Admin.findByPk(id);
  }

  static async updateAdmin(id, data) {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error('Admin not found');
    }
    return await admin.update(data);
  }

  static async deleteAdmin(id) {
    const admin = await Admin.findByPk(id);
    if (!admin) {
      throw new Error('Admin not found');
    }
    await admin.destroy();
    return admin;
  }
}

module.exports = AdminService;
