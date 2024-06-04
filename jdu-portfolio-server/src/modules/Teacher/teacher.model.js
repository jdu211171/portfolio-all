const sha256 = require("sha256");
const { Model, Sequelize, DataTypes } = require("sequelize");
const validateLinks = require("../../utils/validateLinks");
const logger = require("../../services/logger.service");
const { roles } = require("../../constants/server.constants");

class Teacher extends Model {}

module.exports = (sequelize) => {
	try {
		Teacher.init(
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
				fatherName: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				university: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				avatar: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				loginId: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
					validate: {
						isUnique: async function (value) {
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

							const teachers = await sequelize.models.Students.findOne({
								where: { loginId: value },
							});
							if (teachers) {
								throw new Error("loginId must be unique");
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
				email: {
					type: DataTypes.STRING,
				},
				specialisation: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				section: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				position: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				phoneNumber: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				role: {
					type: DataTypes.ENUM(roles.TEACHER, roles.STAFF),
					allowNull: false,
					defaultValue: roles.TEACHER,
				},
				isActive: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
				},
				isDeleted: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
				},
			},
			{
				sequelize,
				modelName: "Teachers",
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
	} catch (error) {
		logger.error(error.message);
	}
};
