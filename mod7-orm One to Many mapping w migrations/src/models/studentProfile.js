'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentProfile.belongsTo(models.Student, {foreignKey: 'studentId', as: 'student'})
    }
  }
  StudentProfile.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'StudentProfile',
    tableName: 'studentProfiles',
    underscored: true
  });
  return StudentProfile;
};