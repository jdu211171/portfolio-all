// src/models/index.js

const { Sequelize } = require('sequelize');
const config = require('../config/config'); // Adjust the path as needed

const env = process.env.NODE_ENV || 'development';

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, config[env]);
}

const db = {};

// Load models
db.Admin = require('./Admin')(sequelize, Sequelize);
// Load other models here if needed
// db.User = require('./User')(sequelize, Sequelize);

// Apply associations here if needed
// Example:
// db.User.hasMany(db.Post);
// db.Post.belongsTo(db.User);

module.exports = {
  sequelize,
  Sequelize,
  db
};
