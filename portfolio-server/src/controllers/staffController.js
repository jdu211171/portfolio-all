const StaffService = require('../services/staffService');

class StaffController {
  static async webhookHandler(req, res) {
    try {
      const { type, record, recordId } = req.body
      
      if (type == "ADD_RECORD") {
        let data = {}
        data.first_name = record.staffName.value
        data.last_name = record.staffName.value
        data.email = record.mail.value
        data.password = "password"
        data.date_of_birth = "1988-07-15 07:00:00+07"
        data.active = true
        const newStaff = await StaffService.createStaff(data);
        console.log("//////////////////////////")
        res.status(201).json(newStaff);
      } else {
        const staffId = req.params.id;
        await StaffService.deleteStaff(staffId);
        res.status(204).end();
      }
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

    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = StaffController;
