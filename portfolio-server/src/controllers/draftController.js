const DraftService = require('../services/draftServie');

class DraftController {
  static async createDraft(req, res) {
    try {
      const draft = await DraftService.create(req.body);
      return res.status(201).json(draft);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getDraftById(req, res) {
    try {
      const { id } = req.params;
      const draft = await DraftService.getById(id);
      if (!draft) {
        return res.status(404).json({ error: 'Draft not found' });
      }
      return res.status(200).json(draft);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async updateDraft(req, res) {
    try {
      const { id } = req.params;
      const draft = await DraftService.update(id, req.body);
      return res.status(200).json(draft);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteDraft(req, res) {
    try {
      const { id } = req.params;
      const draft = await DraftService.delete(id);
      return res.status(200).json({ message: 'Draft deleted successfully', draft });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAllDrafts(req, res) {
    try {
      const drafts = await DraftService.getAll();
      return res.status(200).json(drafts);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = DraftController;
