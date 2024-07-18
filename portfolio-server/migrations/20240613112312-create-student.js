'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      self_introduction: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      hobbies: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gallery: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      skills: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      it_skills: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      other_information: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      partner_university: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deliverables: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      jlpt: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ielts: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      jdu_japanese_certification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      japanese_speech_contest: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      it_contest: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      kintone_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};
