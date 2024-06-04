const { Model, Sequelize, DataTypes } = require("sequelize");
const logger = require("../../services/logger.service");

class Specialisation extends Model {}

module.exports = (sequelize) => {
	try {
		Specialisation.init(
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
				},
				sectionId: {
					type: DataTypes.UUID,
					allowNull: true,
				},
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Specialisations",
			},
		);

		Specialisation.associate = (models) => {
			models.Specialisations.belongsTo(models.Sections, {
				foreignKey: "sectionId",
				as: "section",
			});
		};

		return Specialisation;
	} catch (error) {
		logger.error(error.message);
	}
};
