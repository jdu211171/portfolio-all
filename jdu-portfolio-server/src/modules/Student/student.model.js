const sha256 = require("sha256");
const { Model, Sequelize, DataTypes } = require("sequelize");
const logger = require("../../services/logger.service");
const validateLinks = require("../../utils/validateLinks");
const { roles } = require("../../constants/server.constants");

class Student extends Model {}

module.exports = (sequelize) => {
	try {
		Student.init(
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
				loginId: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
					validate: {
						len: 6,
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

							const teacher = await sequelize.models.Teachers.findOne({
								where: { loginId: value },
							});
							if (teacher) {
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
				groupId: {
					type: DataTypes.UUID,
					allowNull: true,
					onDelete: "SET NULL",
				},
				role: {
					type: DataTypes.ENUM(roles.STUDENT),
					allowNull: true,
					defaultValue: roles.STUDENT,
				},
				avatar: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				bio: {
					type: DataTypes.TEXT,
					allowNull: true,
					defaultValue: null,
				},
				phoneNumber: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				brithday: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				images: {
					type: DataTypes.ARRAY(DataTypes.STRING),
					defaultValue: [],
					allowNull: true,
				},
				videos: {
					type: DataTypes.ARRAY(DataTypes.STRING),
					defaultValue: [],
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
				cv: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				jlpt: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				jdu: {
					type: DataTypes.STRING,
					allowNull: true,
				},
				desc: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				isArchive: {
					type: DataTypes.BOOLEAN,
					defaultValue: false,
				},
			},
			{
				sequelize,
				modelName: "Students",
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

		Student.associate = (models) => {
			// models.Students.belongsTo(models.Specialisations, {
			//     foreignKey: {
			//         name: 'specialisationId',
			//         allowNull: true
			//     },
			//     as: 'specialisation'
			// })

			models.Students.belongsTo(models.Group, {
				foreignKey: "groupId",
				as: "group",
				onDelete: "SET NULL",
			});

			models.Students.belongsToMany(models.Recruitors, {
				through: models.SelectedStudents,
				timestamps: false,
			});
		};

		return Student;
	} catch (error) {
		logger.error(error.message);
	}
};
