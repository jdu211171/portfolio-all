const generatePassword = require('generate-password');

const StaffService = require('../services/staffService');
const { EmailToStaff } = require('../utils/emailToStaff');
class StaffController {
  static async webhookHandler(req, res) {
    try {
      const { type, record, recordId } = req.body
      if (type == "ADD_RECORD") {
        const password = generatePassword.generate({
          length: 12,
          numbers: true,
          symbols: true,
          uppercase: true,
          excludeSimilarCharacters: true
        });
        const data = {
          email: record.mail.value,
          password: password, // This will be hashed by the beforeCreate hook
          first_name: record.staffName.value,
          last_name: record.staffName.value,
          date_of_birth: '1980-01-01',
          department: record['部署'].value,
          position: record.status.value,
          photo: '',
          active: true,
          kintone_id: record['$id'].value
        };
        const newStaff = await StaffService.createStaff(data);
        if (newStaff) {
          EmailToStaff(newStaff.email, password, newStaff.first_name, newStaff.last_name)
        }
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
