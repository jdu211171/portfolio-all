// services/studentService.js

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
  static async getAllStudents() {
    try {
      const students = await Student.findAll();
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
