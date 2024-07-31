const { Op } = require('sequelize');

const { Recruiter } = require('../models');

class RecruiterService {
  // Service method to create a new recruiter
  static async createRecruiter(recruiterData) {
    try {
      const newRecruiter = await Recruiter.create(recruiterData);
      return newRecruiter;
    } catch (error) {
      throw error; // Throw the error for the controller to handle
    }å
  }

  // Service method to retrieve all recruiters
  static async getAllRecruiters(filter) {
    try {
      let query = {}; // Initialize an empty query object
      const searchableColumns = ['email', 'first_name', 'last_name', "company_name", 'company_description', 'phone']; // Example list of searchable columns

      // Iterate through filter keys
      Object.keys(filter).forEach(key => {
        if (filter[key]) {
          // Handle different types of filter values
          if (key === 'search') {
            // Search across all searchable columns
            query[Op.or] = searchableColumns.map(column => {
              // Use Op.iLike for case insensitive search on other columns
              return { [column]: { [Op.iLike]: `%${filter[key]}%` } };
            });
          } else if (Array.isArray(filter[key])) {
            // If filter value is an array, use $in operator
            query[key] = { [Op.in]: filter[key] };
          } else if (typeof filter[key] === 'string') {
            query[key] = { [Op.like]: `%${filter[key]}%` };
          } else {
            // Handle other types of filter values as needed
            query[key] = filter[key];
          }
        }
      });
      const recruiters = await Recruiter.findAll({ where: query, });
      return recruiters;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve a recruiter by ID
  static async getRecruiterById(recruiterId) {
    try {
      const recruiter = await Recruiter.findByPk(recruiterId, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      if (!recruiter) {
        throw new Error('Recruiter not found');
      }
      return recruiter;
    } catch (error) {
      throw error;
    }
  }

  // Service method to update a recruiter
  static async updateRecruiter(recruiterId, recruiterData) {
    try {
      const recruiter = await Recruiter.findByPk(recruiterId, {
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      });
      if (!recruiter) {
        throw new Error('Recruiter not found');
      }
      await recruiter.update(recruiterData);
      return recruiter;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRecruiter(recruiterId) {
    try {
      await Recruiter.destroy({ where: { kintone_id: recruiterId } });
    } catch (error) {
      console.error('Error deleting recruiter:', error);  // Log any errors
      throw error;
    }
  }
}

module.exports = RecruiterService;
