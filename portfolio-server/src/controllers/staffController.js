const StaffService = require('../services/staffService');

class StaffController {
  static async createStaff(req, res) {
    try {
      const newStaff = await StaffService.createStaff(req.body);
      res.status(201).json(newStaff);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllStaff(req, res) {
    try {
      const staffList = await StaffService.getAllStaff();
      res.json(staffList);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStaffById(req, res) {
    try {
      const staffId = req.params.id;
      const staff = await StaffService.getStaffById(staffId);
      res.json(staff);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async updateStaff(req, res) {
    try {
      const staffId = req.params.id;
      const updatedStaff = await StaffService.updateStaff(staffId, req.body);
      res.json(updatedStaff);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async deleteStaff(req, res) {
    try {
      const staffId = req.params.id;
      await StaffService.deleteStaff(staffId);
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = StaffController;
