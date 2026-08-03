import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Enrollment = sequelize.define(
    "Enrollment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        enrolledAt: {
            type: DataTypes.DATE,
            field: "enrolled_at",
            defaultValue: DataTypes.NOW
        },
        grade: {
            type: DataTypes.STRING(2),
            allowNull: true,
            validate: {
                isIn: {
                    args: [['O', 'A', 'B', 'C', 'D', 'E', 'F']],
                    msg: "grade must be between O and F"
                }
            }
        }
    },
    {
        tableName: "enrollments",
        underscored: true,
        timestamps: true,
        createdAt: 'enrolled_at',
        updatedAt: false
    }
)

export default Enrollment;