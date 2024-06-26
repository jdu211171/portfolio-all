const { Bookmark } = require('../models');

class BookmarkService {
  // Service method to create a new bookmark
  static async createBookmark(bookmarkData) {
    try {
      const newBookmark = await Bookmark.create(bookmarkData);
      return newBookmark;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve all bookmarks
  static async getAllBookmarks() {
    try {
      const bookmarks = await Bookmark.findAll();
      return bookmarks;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve a bookmark by ID
  static async getBookmarkById(bookmarkId) {
    try {
      const bookmark = await Bookmark.findByPk(bookmarkId);
      if (!bookmark) {
        throw new Error('Bookmark not found');
      }
      return bookmark;
    } catch (error) {
      throw error;
    }
  }

  // Service method to update a bookmark
  static async updateBookmark(bookmarkId, bookmarkData) {
    try {
      const bookmark = await Bookmark.findByPk(bookmarkId);
      if (!bookmark) {
        throw new Error('Bookmark not found');
      }
      await bookmark.update(bookmarkData);
      return bookmark;
    } catch (error) {
      throw error;
    }
  }

  // Service method to delete a bookmark
  static async deleteBookmark(bookmarkId) {
    try {
      const bookmark = await Bookmark.findByPk(bookmarkId);
      if (!bookmark) {
        throw new Error('Bookmark not found');
      }
      await bookmark.destroy();
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve bookmarks by recruiter ID
  static async getBookmarksByRecruiterId(recruiterId) {
    try {
      const bookmarks = await Bookmark.findAll({
        where: { recruiterId },
      });
      return bookmarks;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve bookmarks by student ID
  static async getBookmarksByStudentId(studentId) {
    try {
      const bookmarks = await Bookmark.findAll({
        where: { studentId },
      });
      return bookmarks;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookmarkService;
