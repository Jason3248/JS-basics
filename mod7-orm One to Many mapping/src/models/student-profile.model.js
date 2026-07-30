import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';


const StudentProfile = sequelize.define(
    "StudentProfile",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty:{
                    msg: "Phone Number cannot be empty"
                },
                len: {
                    args: [10, 15],
                    msg: "Phone number must contain 10 to 15 characters"
                }
            }
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: "date_of_birth",
            validate: {
                isDate: {
                    msg: "Date of birth field must be a valid date"
                }
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            field: "student_id"
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: "is_active",
            defaultValue: true
        }
    },
    {
        tableName: "student_profiles",
        underscored: true,
        timestamps: true
    }
);

export default StudentProfile;