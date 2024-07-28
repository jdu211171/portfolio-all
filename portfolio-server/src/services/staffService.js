const { Staff } = require('../models'); // Assuming your model file is properly exported

class StaffService {
  static async createStaff(data) {
    try {
      const newStaff = await Staff.create(data);
      return newStaff;
    } catch (error) {
      console.error('Error creating staff:', error);  // Log any errors
      throw error;
    }
  }

  static async getAllStaff() {
    try {
      const staffList = await Staff.findAll();
      return staffList;
    } catch (error) {
      throw error;
    }
  }

  static async getStaffById(staffId) {
    try {
      const staff = await Staff.findByPk(staffId, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      if (!staff) {
        throw new Error('Staff not found');
      }
      return staff;
    } catch (error) {
      throw error;
    }
  }

  static async updateStaff(staffId, staffData) {
    try {
      const staff = await Staff.findByPk(staffId, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      if (!staff) {
        throw new Error('Staff not found');
      }
      await staff.update(staffData);
      return staff;
    } catch (error) {
      throw error;
    }
  }

  static async deleteStaff(staffId) {
    try {
      await Staff.destroy({ where: { kintone_id: staffId } });
    } catch (error) {
      console.error('Error deleting staff:', error);  // Log any errors
      throw error;
    }
  }
}

module.exports = StaffService;
