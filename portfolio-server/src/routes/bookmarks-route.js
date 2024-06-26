const express = require('express');
const BookmarkController = require('../controllers/bookmarkController');

const router = express.Router();

// POST /api/bookmarks
router.post('/', BookmarkController.createBookmark);

// GET /api/bookmarks
router.get('/', BookmarkController.getAllBookmarks);

// GET /api/bookmarks/:id
router.get('/:id', BookmarkController.getBookmarkById);

// PUT /api/bookmarks/:id
router.put('/:id',  BookmarkController.updateBookmark);

// DELETE /api/bookmarks/:id
router.delete('/:id', BookmarkController.deleteBookmark);

module.exports = router;
