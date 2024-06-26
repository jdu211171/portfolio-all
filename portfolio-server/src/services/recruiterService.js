const { Recruiter } = require('../models');

class RecruiterService {
  // Service method to create a new recruiter
  static async createRecruiter(recruiterData) {
    try {
      const newRecruiter = await Recruiter.create(recruiterData);
      return newRecruiter;
    } catch (error) {
      throw error; // Throw the error for the controller to handle
    }
  }

  // Service method to retrieve all recruiters
  static async getAllRecruiters() {
    try {
        console.log(Recruiter)
      const recruiters = await Recruiter.findAll();
      return recruiters;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve a recruiter by ID
  static async getRecruiterById(recruiterId) {
    try {
      const recruiter = await Recruiter.findByPk(recruiterId);
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
      const recruiter = await Recruiter.findByPk(recruiterId);
      if (!recruiter) {
        throw new Error('Recruiter not found');
      }
      await recruiter.update(recruiterData);
      return recruiter;
    } catch (error) {
      throw error;
    }
  }

  // Service method to delete a recruiter
  static async deleteRecruiter(recruiterId) {
    try {
      const recruiter = await Recruiter.findByPk(recruiterId);
      if (!recruiter) {
        throw new Error('Recruiter not found');
      }
      await recruiter.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RecruiterService;
