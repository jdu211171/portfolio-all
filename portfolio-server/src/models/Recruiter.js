'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recruiter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recruiter.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    company_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    company_description: DataTypes.TEXT,
    company_photo: DataTypes.STRING,
    photo: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Recruiter',
  });
  return Recruiter;
};