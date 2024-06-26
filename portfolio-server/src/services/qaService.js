
const { QA } = require('../models');

class QAService {
  // Service method to create a new QA entry
  static async createQA(qaData) {
    try {
      const newQA = await QA.create(qaData);
      return newQA;
    } catch (error) {
      throw error;
    }
  }

    // Service method to retrieve all students
    static async getAllQA() {
        try {
          const qa = await QA.findAll();
          return qa;
        } catch (error) {
          throw error;
        }
      }
  // Service method to retrieve a QA entry by ID
  static async getQAById(qaId) {
    try {
      const qa = await QA.findByPk(qaId);
      if (!qa) {
        throw new Error('QA entry not found');
      }
      return qa;
    } catch (error) {
      throw error;
    }
  }

  // Service method to update a QA entry
  static async updateQA(qaId, qaData) {
    try {
      const qa = await QA.findByPk(qaId);
      if (!qa) {
        throw new Error('QA entry not found');
      }
      await qa.update(qaData);
      return qa;
    } catch (error) {
      throw error;
    }
  }

  // Service method to delete a QA entry
  static async deleteQA(qaId) {
    try {
      const qa = await QA.findByPk(qaId);
      if (!qa) {
        throw new Error('QA entry not found');
      }
      await qa.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = QAService;
