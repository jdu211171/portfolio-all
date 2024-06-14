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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming the User model is named 'Users'
        key: 'id'
      }
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Students', // Assuming the Student model is named 'Students'
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });

  return Bookmark;
};
