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

  static async getDraftByStudentId(req, res) {
    try {
      const { student_id } = req.params; // Get student_id from URL params

      if (!student_id) {
        return res.status(400).json({ error: "student_id is required" });
      }

      const drafts = await DraftService.getByStudentId(student_id);

      if (!drafts || drafts.length === 0) {
        return res.status(404).json({ message: "No drafts found for this student" });
      }

      return res.status(200).json(drafts);
    } catch (error) {
      console.error("Error fetching drafts:", error);
      return res.status(500).json({ error: "Internal Server Error" });
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

  // Controller method to get all students
  static async getAllDrafts(req, res, next) {
    try {
      let filter
      if (req.query.filter) {
        filter = req.query.filter
      } else {
        filter = {}
      }

      const students = await DraftService.getAll(filter);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DraftController;
