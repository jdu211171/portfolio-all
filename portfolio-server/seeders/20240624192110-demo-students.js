'use strict';

const bcrypt = require('bcrypt');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const studentsData = [];

    for (let i = 0; i < 10; i++) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);

      // Example it_skills and skills data format
      const itSkills = {
        "上級": [
          { "name": "React", "color": "#039be5" },
          { "name": "Vue", "color": "#2e7d32" }
        ],
        "中級": [
          { "name": "MySQL", "color": "#00838f" }
        ],
        "初級": [
          { "name": "Redis", "color": "#d32f2f" }
        ]
      };

      const skills = {
        "上級": [
          { "name": "Public Speaking", "color": "#ff5722" }
        ],
        "中級": [
          { "name": "Project Management", "color": "#673ab7" }
        ],
        "初級": [
          { "name": "Graphic Design", "color": "#ff9800" }
        ]
      };

      const deliverables = [
        {
          link: "link",
          codeLink: "link",
          imageLink: "link",
          description: "description",
          role: "role"
        },
        {
          link: "link",
          codeLink: "link",
          imageLink: "link",
          description: "description",
          role: "role"
        }
      ];

      const jlptLevels = ["N1", "N2", "N3", "N4", "N5"];
      const jlpt = jlptLevels[Math.floor(Math.random() * jlptLevels.length)];

      // Generate an array of image links for the gallery
      const gallery = Array.from({ length: 5 }, () => faker.image.image());

      studentsData.push({
        email: faker.internet.email(),
        password: hashedPassword,
        student_id: faker.datatype.number({ min: 10000000, max: 99999999 }).toString(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        date_of_birth: faker.date.past(),
        photo: faker.image.avatar(),
        self_introduction: faker.lorem.paragraph(),
        hobbies: faker.random.words(),
        gallery: JSON.stringify(gallery), // Store as JSON string in seed
        skills: JSON.stringify(skills), // Store as JSON string in seed
        it_skills: JSON.stringify(itSkills), // Store as JSON string in seed
        other_information: faker.lorem.paragraph(),
        partner_university: faker.company.companyName(),
        deliverables: JSON.stringify(deliverables),
        jlpt: jlpt,
        ielts: faker.random.word(),
        jdu_japanese_certification: faker.random.word(),
        japanese_speech_contest: faker.random.word(),
        it_contest: faker.random.word(),
        active: true,
        kintone_id: faker.datatype.number(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Students', studentsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Students', null, {});
  }
};
