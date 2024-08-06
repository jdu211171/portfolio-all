const bcrypt = require('bcrypt');
const StaffService = require('../services/staffService');
const { EmailToStaff } = require('../utils/emailToStaff');
class StaffController {
  static async webhookHandler(req, res) {
    try {
      const { type, record, recordId } = req.body;
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
          last_name: record.staffLastName.value,
          department: record.department.value,
          position: record.status.value,
          photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
          kintone_id: record['$id'].value
        };


        const newStaff = await StaffService.createStaff(data);
        let email
        if (newStaff) {
          email = await EmailToStaff(newStaff.email, password, newStaff.first_name, newStaff.last_name);
        }
        res.status(201).json(email);
      } else {
        const staffId = recordId;
        await StaffService.deleteStaff(staffId);
        res.status(204).end();
      }
    } catch (error) {
      console.error('Error in webhook handler:', error);  // Log any errors
      res.status(400).json({ error: error.message });
    }
  }


  static async getAllStaff(req, res) {
    try {
      const filter = req.query.filter || {};
      const staffList = await StaffService.getAllStaff(filter);
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
      const { currentPassword, password, ...updateData } = req.body;

      if (password) {
        const staff = await StaffService.getStaffById(req.params.id);
        if (!staff || !(await bcrypt.compare(currentPassword, staff.password))) {
          return res.status(400).json({ error: 'Текущий пароль неверен' });
        }
      }
      const updatedStaff = await StaffService.updateStaff(req.params.id, {
        ...updateData,
        password: password || undefined,
      });
      res.status(200).json(updatedStaff);
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
