const { Staff } = require('../models'); // Assuming your model file is properly exported

class StaffService {
  static async createStaff(staffData) {
    const sampleData = {
      email: 'jane.doe@example.com',
      password: 'SecurePassword123', // This will be hashed by the beforeCreate hook
      first_name: 'Jane',
      last_name: 'Doe',
      date_of_birth: '1980-01-01',
      photo: 'http://example.com/photo.jpg',
      active: true,
    };
  
    try {
      console.log('Creating new staff with data:', sampleData);
      const newStaff = await Staff.create(sampleData);
      console.log('New staff created:', newStaff);
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
