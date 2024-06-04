const { Model, DataTypes, Sequelize } = require("sequelize");
const logger = require("../../services/logger.service");

class Infos extends Model {}

module.exports = (sequelize) => {
	try {
		Infos.init(
			{
				id: {
					type: DataTypes.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
					unique: true,
				},
				emailInfo: {
					type: DataTypes.STRING,
					allowNull: true,
					unique: true,
				},
				phoneNumber: {
					type: DataTypes.STRING,
					allowNull: true,
					defaultValue: "+998 98 876 54 32",
				},
				startTime: {
					type: DataTypes.STRING,
					allowNull: true,
					defaultValue: "09:00",
				},
				endTime: {
					type: DataTypes.STRING,
					allowNull: true,
					defaultValue: "21:00",
				},
				location: {
					type: DataTypes.STRING,
					allowNull: true,
					defaultValue: "Tashkent, Shayhontohur district, Sebzor, 21",
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Infos",
			},
		);

		return Infos;
	} catch (error) {
		logger.error(error.message);
	}
};
