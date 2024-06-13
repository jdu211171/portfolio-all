'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      // Define association with User model
      Bookmark.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

      // Define association with Student model
      Bookmark.belongsTo(models.Student, { foreignKey: 'studentId', as: 'student' });
    }
  }
  
  Bookmark.init({
    userId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  
  return Bookmark;
};
