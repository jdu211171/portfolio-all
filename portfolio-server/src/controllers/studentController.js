const bcrypt = require('bcrypt');
const StudentService = require('../services/studentService');

class StudentController {
  // Controller method to create a new student
  static async createStudent(req, res, next) {
    try {
      const studentData = req.body;
      const newStudent = await StudentService.createStudent(studentData);
      res.status(201).json(newStudent);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to get all students
  static async getAllStudents(req, res, next) {
    try {
      let filter
      if (req.query.filter) {
        filter = req.query.filter
      } else {
        filter = {}
      }

      const recruiterId = req.query.recruiterId;
      const onlyBookmarked = req.query.onlyBookmarked

      const students = await StudentService.getAllStudents(filter, recruiterId, onlyBookmarked);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to get a student by ID
  static async getStudentById(req, res, next) {
    try {
      const { id } = req.params;
      const student = await StudentService.getStudentById(id);
      res.status(200).json(student);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to update a student
  static async updateStudent(req, res, next) {
    try {
      const { id } = req.params;
      const studentData = req.body;

      const { currentPassword, password, ...updateData } = req.body;

      if (password) {
        const student = await StudentService.getStudentById(req.params.id);
        if (!student || !(await bcrypt.compare(currentPassword, student.password))) {
          return res.status(400).json({ error: 'Текущий пароль неверен' });
        }
      }
      
      const updatedStudent = await StudentService.updateStudent(id, {
        ...studentData,
        password: password || undefined,
      });
      res.status(200).json(updatedStudent);
    } catch (error) {
      next(error);
    }
  }

  // Controller method to delete a student
  static async deleteStudent(req, res, next) {
    try {
      const { id } = req.params;
      await StudentService.deleteStudent(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  // sample email sender
  static async mail(req, res, next) {
    try {
      const { email, password, firstName, lastName } = req.body;
      await StudentService.EmailToStudent(email, password, firstName, lastName);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
