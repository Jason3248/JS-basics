import Student from './student.model.js';
import StudentProfile from './student-profile.model.js';
import Department from './department.model.js';

Student.hasOne(
    StudentProfile,
    {
        foreignKey:{
            name: "studentId",
            field: "student_id",
            allowNull: false
        },
        as: "profile"
    }
)


StudentProfile.belongsTo(
    Student,
    {
        foreignKey:{
            name: "studentId",
            field: "student_id",
            allowNull: false
        },
        as: "student",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
)


Student.belongsTo(
    Department,
    {
        foreignKey: {
            name: "departmentId",
            field: "department_id",
            allowNull: true
        },
        as: "department"
    }
)


Department.hasMany(
    Student, 
    {
        foreignKey: {
            name: "departmentId",
            field: "department_id",
            allowNull: true
        },
        as: "student"
    }
)

export {Student, StudentProfile, Department};