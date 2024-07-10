// seeders/20240624175434-demo-students.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const studentsData = [
      {
        email: 'student1@example.com',
        password: 'password1',
        student_id:"t19b0007",
        first_name: 'John',
        last_name: 'Doe',
        date_of_birth: '1995-05-15',
        photo: 'https://example.com/photo1.jpg',
        self_introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        hobbies: 'Reading, hiking',
        gallery: 'https://example.com/gallery1.jpg',
        skills: 'JavaScript, React, Node.js',
        it_skills: 'HTML, CSS, JavaScript',
        other_information: 'Additional information about the student',
        academic_units: 120,
        partnership_units: 50,
        jlpt: 'N3',
        ielts: '6.5',
        jdu_japanese_certification: 'Certified',
        japanese_speech_contest: 'Winner',
        it_contest: 'Participant',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'student2@example.com',
        password: 'password2',
        student_id:"t19b0001",
        first_name: 'Jane',
        last_name: 'Smith',
        date_of_birth: '1998-08-25',
        photo: 'https://example.com/photo2.jpg',
        self_introduction: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        hobbies: 'Swimming, photography',
        gallery: 'https://example.com/gallery2.jpg',
        skills: 'Python, Django, Flask',
        it_skills: 'Python, HTML, CSS',
        other_information: 'Additional information about the student',
        academic_units: 150,
        partnership_units: 40,
        jlpt: 'N2',
        ielts: '7.0',
        jdu_japanese_certification: 'Not certified',
        japanese_speech_contest: 'Participant',
        it_contest: 'Participant',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more sample data as needed
    ];

    await queryInterface.bulkInsert('Students', studentsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {});
  },
};
