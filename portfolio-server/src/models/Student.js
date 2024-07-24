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
    student_id: {
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
      allowNull: true,
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
      type: DataTypes.JSONB,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    it_skills: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    other_information: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    semester: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'),
      allowNull: false,
      defaultValue: '1',
    },
    partner_university: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    partner_university_credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    deliverables: {
      type: DataTypes.JSONB,
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    kintone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
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
