const QAService = require('../services/QAService');

class QAController {
  // Controller method to create a new QA entry
  static async createQA(req, res, next) {
    try {
      const { category, question, answer, studentId } = req.body;
      const qaData = { category, question, answer, studentId };
      const newQA = await QAService.createQA(qaData);
      res.status(201).json(newQA);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to retrieve all QA entries
  static async getAllQA(req, res, next) {
    try {
      const qaList = await QAService.getAllQA();
      res.json(qaList);
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

  // Controller method to find QA entries by category
  static async findQAByCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      const qaList = await QAService.findQAByCategory(categoryId);
      res.json(qaList);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to find QA entries by studentId
  static async findQAByStudentId(req, res, next) {
    try {
      const { studentId } = req.params;
      const qaList = await QAService.findQAByStudentId(studentId);
      res.json(qaList);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to count QA entries
  static async countQA(req, res, next) {
    try {
      const count = await QAService.countQA();
      res.json({ count });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = QAController;
