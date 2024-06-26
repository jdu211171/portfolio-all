const BookmarkService = require('../services/bookmarkService');
const { validationResult } = require('express-validator');

class BookmarkController {
  // Controller method to create a new bookmark
  static async createBookmark(req, res, next) {
    try {
      const { userId, studentId } = req.body;
      
      // Create bookmark using BookmarkService
      const newBookmark = await BookmarkService.createBookmark({ userId, studentId });
      
      res.status(201).json(newBookmark);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to get all bookmarks
  static async getAllBookmarks(req, res, next) {
    try {
      const bookmarks = await BookmarkService.getAllBookmarks();
      
      res.status(200).json(bookmarks);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to get a bookmark by ID
  static async getBookmarkById(req, res, next) {
    try {
      const { id } = req.params;
      
      const bookmark = await BookmarkService.getBookmarkById(id);
      res.status(200).json(bookmark);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to update a bookmark
  static async updateBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const bookmarkData = req.body;
      
      const updatedBookmark = await BookmarkService.updateBookmark(id, bookmarkData);
      res.status(200).json(updatedBookmark);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to delete a bookmark
  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params;
      
      await BookmarkService.deleteBookmark(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookmarkController;
