'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class QA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Recruiter model
      QA.belongsTo(models.Recruiter, { foreignKey: 'userId', as: 'user' });
    }
  }
  
  QA.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Recruiters', // Assuming the Recruiter model is named 'Recruiters'
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'QA',
  });
  
  return QA;
};
