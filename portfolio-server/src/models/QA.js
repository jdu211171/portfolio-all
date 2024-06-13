'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QA.belongsTo(models.Recruiter, { foreignKey: 'userId', as: 'user' });
    }
  }
  QA.init({
    category: DataTypes.STRING,
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QA',
  });
  return QA;
};