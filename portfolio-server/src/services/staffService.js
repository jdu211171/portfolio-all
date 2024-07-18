const { Staff } = require('../models'); // Assuming your model file is properly exported

class StaffService {
  static async createStaff(staffData) {
    try {
      const newStaff = await Staff.create(staffData);
      return newStaff;
    } catch (error) {
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
      const staff = await Staff.findByPk(staffId);
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
      const staff = await Staff.findByPk(staffId);
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
      const staff = await Staff.findByPk(staffId);
      if (!staff) {
        throw new Error('Staff not found');
      }
      await staff.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = StaffService;
