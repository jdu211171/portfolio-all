'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      date_of_birth: {
        type: Sequelize.DATE
      },
      photo: {
        type: Sequelize.STRING
      },
      self_introduction: {
        type: Sequelize.TEXT
      },
      hobbies: {
        type: Sequelize.STRING
      },
      gallery: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      it_skills: {
        type: Sequelize.STRING
      },
      other_information: {
        type: Sequelize.TEXT
      },
      academic_units: {
        type: Sequelize.INTEGER
      },
      partnership_units: {
        type: Sequelize.INTEGER
      },
      jlpt: {
        type: Sequelize.STRING
      },
      ielts: {
        type: Sequelize.STRING
      },
      jdu_japanese_certification: {
        type: Sequelize.STRING
      },
      japanese_speech_contest: {
        type: Sequelize.STRING
      },
      it_contest: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};