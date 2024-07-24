// services/studentService.js
const { Op } = require('sequelize');
const { Student } = require('../models');
const { sendEmail } = require('../utils/emailService');

class StudentService {
  // Service method to create a new student
  static async createStudent(studentData) {
    try {
      const newStudent = await Student.create(studentData);
      return newStudent;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve all students
  static async getAllStudents(filter) {
    try {
      let query = {}; // Initialize an empty query object
      const searchableColumns = ['email', 'first_name', 'last_name', 'self_introduction', 'hobbies', 'skills', 'it_skills', 'jlpt']; // Example list of searchable columns

      // Iterate through filter keys
      Object.keys(filter).forEach(key => {
        if (filter[key]) {
          // Handle different types of filter values
          if (key === 'search') {
            // Search across all searchable columns
            query[Op.or] = searchableColumns.map(column => {
              if (['skills', 'it_skills'].includes(column)) {
                // Handle JSONB fields specifically
                return {
                  [Op.or]: [
                    { [column]: { '上級::text': { [Op.iLike]: `%${filter[key]}%` } } },
                    { [column]: { '中級::text': { [Op.iLike]: `%${filter[key]}%` } } },
                    { [column]: { '初級::text': { [Op.iLike]: `%${filter[key]}%` } } }
                  ]
                };
              } else {
                // Use Op.iLike for case insensitive search on other columns
                return { [column]: { [Op.iLike]: `%${filter[key]}%` } };
              }
            });
          } else if (key === 'skills' || key === "it_skills") {
            // Search across all searchable columns
            query[Op.or] = {
              [Op.or]: [
                { [key]: { '上級::text': { [Op.iLike]: `%${filter[key]}%` } } },
                { [key]: { '中級::text': { [Op.iLike]: `%${filter[key]}%` } } },
                { [key]: { '初級::text': { [Op.iLike]: `%${filter[key]}%` } } }
              ]
            }
          } else if (Array.isArray(filter[key])) {
            // If filter value is an array, use $in operator
            query[key] = { [Op.in]: filter[key] };
          } else if (typeof filter[key] === 'string') {
            // If filter value is a string, use $like operator for partial match
            query[key] = { [Op.like]: `%${filter[key]}%` };
          } else {
            // Handle other types of filter values as needed
            query[key] = filter[key];
          }
        }
      });
      console.dir(query, { depth: null, symbols: true })
      // Execute the query to fetch students
      const students = await Student.findAll({
        where: query,
      });

      return students;
    } catch (error) {
      throw error;
    }
  }

  // Service method to retrieve a student by ID
  static async getStudentById(studentId) {
    try {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
  }

  // Service method to update a student
  static async updateStudent(studentId, studentData) {
    try {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.update(studentData);
      return student;
    } catch (error) {
      throw error;
    }
  }

  // Service method to delete a student
  static async deleteStudent(studentId) {
    try {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error('Student not found');
      }
      await student.destroy();
    } catch (error) {
      throw error;
    }
  }

  //this is sample to send email
  static async EmailToStudent(email, password, firstName, lastName) {

    // Send a welcome email to the new admin
    const to = email
    const subject = 'Welcome to JDU';
    const text = `Hi ${firstName},\n\nWelcome to JDU. Your account has been created.\n\nBest regards,\nJDU Team`;
    const html = `<p>Hi ${firstName},</p><p>Welcome to JDU. Your account has been created.</p><p>Best regards,<br>JDU Team</p>`;
    console.log(to, subject, text, html)
    await sendEmail(to, subject, text, html);

    return "email send successfully";
  }
}

module.exports = StudentService;
