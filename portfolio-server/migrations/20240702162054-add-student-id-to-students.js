'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Students', 'student_id', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      after: 'password'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Students', 'student_id');
  }
};
