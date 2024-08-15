'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const gallery = Array.from({ length: 5 }, () => `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 101)}`);
    const recruiters = [
      {
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567890',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1980-01-01',
        active: true,
        kintone_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'jane.doe@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567891',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Jane',
        last_name: 'Doe',
        date_of_birth: '1981-02-02',
        active: true,
        kintone_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'mike.smith@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567892',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Mike',
        last_name: 'Smith',
        date_of_birth: '1982-03-03',
        active: true,
        kintone_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'susan.jones@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567893',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Susan',
        last_name: 'Jones',
        date_of_birth: '1983-04-04',
        active: true,
        kintone_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'peter.brown@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567894',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Peter',
        last_name: 'Brown',
        date_of_birth: '1984-05-05',
        active: true,
        kintone_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'linda.white@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567895',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Linda',
        last_name: 'White',
        date_of_birth: '1985-06-06',
        active: true,
        kintone_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'david.miller@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567896',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'David',
        last_name: 'Miller',
        date_of_birth: '1986-07-07',
        active: true,
        kintone_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'barbara.wilson@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567897',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Barbara',
        last_name: 'Wilson',
        date_of_birth: '1987-08-08',
        active: true,
        kintone_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'robert.moore@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567898',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Robert',
        last_name: 'Moore',
        date_of_birth: '1988-09-09',
        active: true,
        kintone_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'patricia.taylor@example.com',
        password: await bcrypt.hash('password123', saltRounds),
        company_name: 'Example Corp',
        phone: '1234567899',
        company_description: 'A sample company description.',
        gallery: JSON.stringify(gallery),
        photo: "https://randomuser.me/api/portraits/med/men/" + parseInt(Math.random() * 100) + ".jpg",
        first_name: 'Patricia',
        last_name: 'Taylor',
        date_of_birth: '1989-10-10',
        active: true,
        kintone_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert('Recruiters', recruiters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recruiters', null, {});
  }
};
