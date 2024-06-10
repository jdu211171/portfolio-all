const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const teacherModel = require("./teacher.model");
const { Op, literal } = require("sequelize");
const validation = require("../Validator/validator.service");
const sha256 = require("sha256");

class TeacherServices {
	constructor(sequelize) {
		teacherModel(sequelize);
		this.models = sequelize.models;
	}

	async getAll({ page = 1, limit = 10, specialisation, search, role, position }) {
		try {
			// ---
			const teachers = await this.models.Teachers.findAndCountAll({
				order: [["createdAt", "DESC"]],
				where: {
					isActive: true,
					isDeleted: false,
					...(search && {
						[Op.or]: [
							{ firstName: { [Op.iLike]: "%" + search + "%" } },
							{ lastName: { [Op.iLike]: "%" + search + "%" } },
						],
					}),
					...(specialisation && {
						specialisation: { [Op.eq]: specialisation },
					}),
					...(position && {
						position: { [Op.eq]: position },
					}),
					...(role && {
						role: { [Op.eq]: role },
					}),
				},
				offset: (page - 1) * limit,
				limit,
			});
			return teachers;
		} catch (error) {
			return SequelizeError(error);
		}
	}
	async getOne(id) {
		try {
			const teacher = await this.models.Teachers.findOne({
				where: {
					id: id,
					isActive: true,
				},
			});
			return teacher;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async create(body) {
		try {
			const validate = validation.email([body], false);
			if (validate.error) return validate;

			if (body?.email) {
				if (!validation.isEmailUniqueInAllTables(body.email))
					return SequelizeError({
						error: true,
						status: 400,
						message: "Email already exist!",
					});
			} else {
				return SequelizeError({
					error: true,
					status: 400,
					message: "Email must be exist!",
				});
			}

			const teacher = await this.models.Teachers.create(body);
			return teacher;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async update(id, body) {
		try {
			body.isActive = true;
			if (body?.avatar == " ") {
				body.avatar = null;
			}
			const [_, teacher] = await this.models.Teachers.update(body, {
				where: { id },
				returning: true,
				individualHooks: true,
			});
			return teacher?.[0] || {};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async checkPassword(psw) {
		try {
			const teacher = await this.models.Teachers.findOne({
				where: { password: sha256(psw) },
			});

			return teacher;
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new TeacherServices(sequelize);
