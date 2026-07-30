import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Course = sequelize.define(
    "Course",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "Department name cannot be empty"
                }
            }
        },
        credits: {
            type: DataTypes.INTEGER,
            validate: {
                isInt: {
                    msg: "Course Credits must be an integer"
                },
                min: {
                    args: [1],
                    msg: "Course Credits must be at least 1"
                }
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        tableName: "courses",
        timestamps: true,
        underscored: true
    }
)

export default Course;