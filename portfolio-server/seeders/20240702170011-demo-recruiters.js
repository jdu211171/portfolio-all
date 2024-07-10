'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10); // Replace 'password123' with the desired password
    const currentDate = new Date();

    return queryInterface.bulkInsert('Recruiters', [
      {
        email: 'recruiter1@example.com',
        password: password,
        company_name: 'ABC Company',
        phone_number: '1234567890',
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: new Date('1990-01-01'),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        email: 'recruiter2@example.com',
        password: password,
        company_name: 'XYZ Inc.',
        phone_number: '9876543210',
        first_name: 'Jane',
        last_name: 'Smith',
        date_of_birth: new Date('1985-05-15'),
        active: true,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      // Add more recruiter objects as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all entries for the Recruiters table
    return queryInterface.bulkDelete('Recruiters', null, {});
  }
};
