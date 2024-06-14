'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    self_introduction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hobbies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gallery: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    it_skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    other_information: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    academic_units: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    partnership_units: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    jlpt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ielts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jdu_japanese_certification: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    japanese_speech_contest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    it_contest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Student',
    hooks: {
      beforeCreate: async (student) => {
        if (student.password) {
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(student.password, salt);
        }
      },
      beforeUpdate: async (student) => {
        if (student.password) {
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(student.password, salt);
        }
      },
    },
  });

  return Student;
};
