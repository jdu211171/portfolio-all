const { Model, DataTypes, Sequelize } = require("sequelize");
const logger = require("../../services/logger.service");

class LessonResult extends Model {}

module.exports = (sequelize) => {
    try {
        LessonResult.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            status: {
                type: DataTypes.ENUM(['Incompleted', 'Completed']),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'LessonResults',
        })

        LessonResult.associate = (models) => {
            models.LessonResults.belongsTo(models.Semesters, {
                foreignKey: {
                    name: 'semesterId',
                    allowNull: false
                },
                as: 'semesters',
                onDelete: 'cascade'
            })
        }

        return LessonResult
    } catch (error) {
        logger.error(error.message)
    }
}