const { validationResult } = require('express-validator');
const RecruiterService = require('../services/recruiterService');

const { EmailToStaff } = require('../utils/emailToStaff');
const generatePassword = require('generate-password');
class RecruiterController {

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
          first_name: record.recruiterName.value,
          last_name: record.recruiterLastName.value,
          company_name: record.companyName.value,
          phone: record.phoneNumber.value,
          photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
          active: false,
          kintone_id: record['$id'].value
        };

        const newRecruiter = await RecruiterService.createRecruiter(data);

        if (newRecruiter) {
          EmailToStaff(newRecruiter.email, password, newRecruiter.first_name, newRecruiter.last_name);
        }
        res.status(201).json(newRecruiter);
      } else {
        const recruiterId = recordId;
        await RecruiterService.deleteRecruiter(recruiterId);
        res.status(204).end();
      }
    } catch (error) {
      console.error('Error in webhook handler:', error);  // Log any errors
      res.status(400).json({ error: error.message });
    }
  }


  static async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newRecruiter = await RecruiterService.createRecruiter(req.body);
      res.status(201).json(newRecruiter);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      let filter
      if (req.query.filter) {
        filter = req.query.filter
      } else {
        filter = {}
      }

      const recruiters = await RecruiterService.getAllRecruiters(filter);
      res.status(200).json(recruiters);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const recruiter = await RecruiterService.getRecruiterById(req.params.id);
      res.status(200).json(recruiter);
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updatedRecruiter = await RecruiterService.updateRecruiter(req.params.id, req.body);
      res.status(200).json(updatedRecruiter);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      await RecruiterService.deleteRecruiter(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RecruiterController;
