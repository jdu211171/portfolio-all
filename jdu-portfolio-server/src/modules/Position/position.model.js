const { Model, DataTypes, Sequelize } = require("sequelize");
const logger = require("../../services/logger.service");

class Position extends Model {}

module.exports = (sequelize) => {
	try {
		Position.init(
			{
				id: {
					type: DataTypes.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
					unique: true,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Positions",
			},
		);

		return Position;
	} catch (error) {
		logger.error(error.message);
	}
};
