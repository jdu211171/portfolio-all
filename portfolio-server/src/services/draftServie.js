const { Draft } = require('../models');

class DraftService {
  // Create draft
  static async create(data) {
    return Draft.create(data);
  }

  // get draft for ID
  static async getById(id) {
    return Draft.findByPk(id);
  }

  // update draft
  static async update(id, data) {
    const draft = await Draft.findByPk(id);
    if (!draft) {
      throw new Error('Draft not found');
    }
    return draft.update(data);
  }

  // Delete draft
  static async delete(id) {
    const draft = await Draft.findByPk(id);
    if (!draft) {
      throw new Error('Draft not found');
    }
    return draft.destroy();
  }

  // get All dreaftes
  static async getAll() {
    return Draft.findAll();
  }
}

module.exports = DraftService;
