const QAService = require('../services/qaService');

class QAController {
  // Controller method to create a new QA entry
  static async createQA(req, res, next) {
    try {
      const { category, question, answer, userId } = req.body;
      const newQA = await QAService.createQA({ category, question, answer, userId });
      res.status(201).json(newQA);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to retrieve all QA entries
  static async getAllQA(req, res, next) {
    try {
      const qas = await QAService.getAllQA();
      res.json(qas);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to retrieve a QA entry by ID
  static async getQAById(req, res, next) {
    try {
      const { id } = req.params;
      const qa = await QAService.getQAById(id);
      res.json(qa);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to update a QA entry
  static async updateQA(req, res, next) {
    try {
      const { id } = req.params;
      const qaData = req.body;
      const updatedQA = await QAService.updateQA(id, qaData);
      res.json(updatedQA);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to delete a QA entry
  static async deleteQA(req, res, next) {
    try {
      const { id } = req.params;
      await QAService.deleteQA(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QAController;
