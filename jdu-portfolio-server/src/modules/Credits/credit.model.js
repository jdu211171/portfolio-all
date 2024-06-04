const { Model, DataTypes, Sequelize } = require("sequelize");
const logger = require("../../services/logger.service");

class Credit extends Model {}

module.exports = (sequelize) => {
    try {
        Credit.init({
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true,
            },
            lessonName: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            university: {
                type: DataTypes.STRING(),
                allowNull: false
            },
            credit: {
                type: DataTypes.INTEGER(),
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0
                }
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Credits',
        })

        Credit.associate = (models) => {
            models.Credits.hasMany(models.LessonResults, {
                foreignKey: {
                    name: 'creditId',
                    allowNull: false
                },
                as: 'lesson',
                onDelete: 'cascade'
            })
        }

        return Credit
    } catch (error) {
        logger.error(error.message)
    }
}