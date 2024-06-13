'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    photo: DataTypes.STRING,
    self_introduction: DataTypes.TEXT,
    hobbies: DataTypes.STRING,
    gallery: DataTypes.STRING,
    skills: DataTypes.STRING,
    it_skills: DataTypes.STRING,
    other_information: DataTypes.TEXT,
    academic_units: DataTypes.INTEGER,
    partnership_units: DataTypes.INTEGER,
    jlpt: DataTypes.STRING,
    ielts: DataTypes.STRING,
    jdu_japanese_certification: DataTypes.STRING,
    japanese_speech_contest: DataTypes.STRING,
    it_contest: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};