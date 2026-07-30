import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';


const Department = sequelize.define(
    "Department",
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
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        }
    },
    {
        tableName: "departments",
        timestamps: true,
        underscored: true
    }
)

export default Department;