// backend/src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true, // Use snake_case for automatically added attributes (createdAt, updatedAt)
  },
});

module.exports = sequelize;
