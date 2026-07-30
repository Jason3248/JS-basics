import Student from './student.model.js';
import StudentProfile from './student-profile.model.js';
import Department from './department.model.js';
import Course from './course.model.js';
import Enrollment from './enrollment.model.js';

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

Student.belongsToMany(
    Course,
    {
        through: Enrollment,
        foreignKey: "studentId",
        otherKey: "courseId",
        as: "course"
    }
)

Course.belongsToMany(
    Student,
    {
        through: Enrollment,
        foreignKey: "courseId",
        otherKey: "studentId",
        as: "student"
    }
)


export {Student, StudentProfile, Department, Course};