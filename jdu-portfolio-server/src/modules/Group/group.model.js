const { Model, Sequelize, DataTypes } = require("sequelize");
const { years } = require("../../constants/server.constants");
const logger = require("../../services/logger.service");

class Group extends Model {}

module.exports = (sequelize) => {
	try {
		Group.init(
			{
				id: {
					type: DataTypes.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
					unique: true,
				},
				name: { type: DataTypes.STRING, unique: false },
				collection: { type: DataTypes.STRING, defaultValue: "IT" },
				year: {
					type: DataTypes.ENUM(
						years.FIRST,
						years.SECOND,
						years.THIRD,
						years.FOURTH,
					),
					defaultValue: years.FIRST,
				},
				isDeleted: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
				},
			},
			{
				sequelize,
				modelName: "Group",
			},
		);

		Group.associate = (models) => {
			models.Group.hasMany(models.Students, {
				foreignKey: {
					name: "groupId",
					onDelete: "SET NULL",
					hooks: true,
				},
				as: "students",
			});
		};

		return Group;
	} catch (error) {
		logger.error(error.message);
	}
};
