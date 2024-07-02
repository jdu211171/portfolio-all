'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10); // Replace 'password123' with the desired password
    const currentDate = new Date();

    return queryInterface.bulkInsert('Staff', [
      {
        email: 'staff1@example.com',
        password: password,
        first_name: 'Michael',
        last_name: 'Smith',
        date_of_birth: new Date('1988-07-15'),
        photo: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        email: 'staff2@example.com',
        password: password,
        first_name: 'Emily',
        last_name: 'Johnson',
        date_of_birth: new Date('1992-02-28'),
        photo: 'https://randomuser.me/api/portraits/med/women/2.jpg',
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      // Add more staff members as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries for the Staff table
    return queryInterface.bulkDelete('Staff', null, {});
  }
};
