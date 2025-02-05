const express = require('express');
const DraftController = require('../controllers/draftController');
const router = express.Router();

router.post('/', DraftController.createDraft);
router.get('/:id', DraftController.getDraftById);
router.put('/:id', DraftController.updateDraft);
router.delete('/:id', DraftController.deleteDraft);
router.get('/', DraftController.getAllDrafts);

module.exports = router;
