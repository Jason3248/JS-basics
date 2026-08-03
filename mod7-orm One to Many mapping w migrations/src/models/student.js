'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Department, {foreignKey: 'departmentId', as: 'department'});
      Student.hasOne(models.StudentProfile, {foreignKey: 'studentId', as: 'profile'})
    }
  }
  Student.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    departmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    underscored: true
  });
  return Student;
};