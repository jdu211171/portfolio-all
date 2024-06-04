const { Model, DataTypes, Sequelize } = require("sequelize");
const logger = require("../../services/logger.service");

class Section extends Model {}

module.exports = (sequelize) => {
	try {
		Section.init(
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
			},
			{
				sequelize,
				timestamps: false,
				modelName: "Sections",
			},
		);

		Section.associate = (models) => {
			models.Sections.hasMany(models.Specialisations, {
				foreignKey: {
					name: "sectionId",
				},
				as: "specialisations",
			});
		};

		return Section;
	} catch (error) {
		logger.error(error.message);
	}
};
