const { validationResult } = require('express-validator');
const RecruiterService = require('../services/recruiterService');

class RecruiterController {
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
      const recruiters = await RecruiterService.getAllRecruiters();
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
