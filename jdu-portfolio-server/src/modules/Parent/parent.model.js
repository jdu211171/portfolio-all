const { Model, DataTypes, Sequelize } = require("sequelize");
const logger = require("../../services/logger.service");
const sha256 = require("sha256");
const { roles } = require("../../constants/server.constants");

class Parent extends Model {}

module.exports = (sequelize) => {
	try {
		Parent.init(
			{
				id: {
					type: DataTypes.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
					unique: true,
				},
				firstName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				lastName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				avatar: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				phoneNumber: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				email: {
					type: DataTypes.STRING,
				},
				loginId: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
					validate: {
						isUnique: async function (value) {
							try {
								const recruitor = await sequelize.models.Recruitors.findOne({
									where: { loginId: value },
								});
								if (recruitor) {
									throw new Error("loginId must be unique");
								}

								const decan = await sequelize.models.Decan.findOne({
									where: { loginId: value },
								});
								if (decan) {
									throw new Error("loginId must be unique");
								}

								const teacher = await sequelize.models.Teachers.findOne({
									where: { loginId: value },
								});
								if (teacher) {
									throw new Error("loginId must be unique");
								}

								const student = await sequelize.models.Students.findOne({
									where: { email: value },
								});
								if (student) {
									throw new Error("email must be unique");
								}

								const parent = await sequelize.models.Parents.findOne({
									where: { email: value },
								});
								if (parent) {
									throw new Error("email must be unique");
								}
							} catch (error) {
								throw new Error("something went wrong!");
							}
						},
					},
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						len: 8,
					},
				},
				isDeleted: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
					allowNull: false,
				},
				isActive: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
					allowNull: true,
				},
				role: {
					type: DataTypes.ENUM(roles.PARENT),
					allowNull: false,
					defaultValue: roles.PARENT,
				},
			},
			{
				sequelize,
				modelName: "Parents",
				hooks: {
					beforeCreate: (model) => {
						const values = model.dataValues;
						if (values?.password) {
							model.password = sha256(values.password);
						}
					},
					beforeUpdate: (model) => {
						const values = model.dataValues;
						if (model._previousDataValues?.password !== values?.password) {
							model.password = sha256(values.password);
						}
					},
				},
			},
		);

		sequelize.define(
			"StudentParents",
			{
				id: {
					type: DataTypes.UUID,
					allowNull: false,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
					unique: true,
				},
			},
			{
				timestamps: false,
				modelName: "StudentParents",
			},
		);

		Parent.associate = (models) => {
			models.Parents.belongsToMany(models.Students, {
				through: models.StudentParents,
				as: "Students",
				onDelete: "CASCADE",
			});
		};

		return Parent;
	} catch (error) {
		logger.error(error.message);
	}
};
