const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const { generatePassword, generateLoginId } = require("../../utils/generator");
const parentModel = require("./parent.model");
const validation = require("../Validator/validator.service");
const { welcomeTemplate, subject } = require("../../configs/email.config.js");
const sendEmail = require("../../services/email.service.js");
const sha256 = require("sha256");
const logger = require("../../services/logger.service");
const { Op, literal } = require("sequelize");
const { uploadFile, removeFile } = require("../../services/file.service.js");

class ParentServices {
	constructor(sequelize) {
		parentModel(sequelize);
		this.models = sequelize.models;
	}

	async getAll({ search, year, groups }) {
		try {
			const parents = await this.models.Parents.findAll({
				order: [["createdAt", "DESC"]],
				where: {
					isDeleted: false,
					isActive: true,
					...(search && {
						[Op.or]: [
							{ firstName: { [Op.iLike]: "%" + search + "%" } },
							{ lastName: { [Op.iLike]: "%" + search + "%" } },
						],
					}),
				},
				include: {
					model: this.models.Students,
					as: "Students",
					where: { isActive: true, isDeleted: false, isArchive: false },
					include: {
						model: this.models.Group,
						as: "group",
						where: {
							...(year && { year: { [Op.eq]: year } }),
							...(groups && { name: { [Op.iLike]: "%" + groups + "%" } }),
						},
					},
				},
			});
			return parents;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getOne(parentId) {
		try {
			const parents = await this.models.Parents.findOne({
				where: { id: parentId },
				include: {
					model: this.models.Students,
					as: "Students",
					where: { isActive: true, isDeleted: false, isArchive: false },
				},
			});
			return parents;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async create(body) {
		try {
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
			const recursionId = (id) => {
				const check = validation.isLoginIdUniqueInAllTables(id);
				if (check) {
					return id;
				} else {
					return recursionId(generateLoginId());
				}
			};

			const parentIsValid = validation.isLoginIdUniqueInAllTables(
				body?.loginId || "*#/",
			);
			const studentIsValid = validation.isLoginIdUniqueInAllTables(
				body?.studentId || "*#/",
			);

			if (!parentIsValid || !studentIsValid) {
				let msg = "";
				if (!parentIsValid) msg += "Parent -login id- must be valid";
				if (!studentIsValid) msg += ", Student -login id- must be valid";

				logger.error(msg);
				return;
			}

			let datas = {
				loginId: body.loginId || recursionId(generateLoginId()),
				password: generatePassword(),
				email: body?.email,
				isActive: false,
			};
			const student = await this.models.Students.findOne({
				where: { loginId: body.studentId },
			});

			if (student) {
				const studentParent = await this.models.Parents.create(datas, {
					returning: true,
				});

				if (studentParent) {
					await this.models.StudentParents.create({
						StudentId: student.id,
						ParentId: studentParent.id,
					});

					await sendEmail({
						to: datas.email,
						subject: "JDUポートフォリオシステムの登録情報",
						html: welcomeTemplate({
							loginId: datas.email,
							password: datas.password,
						}),
					});
				} else {
					return { error: true, status: 400, message: "Parent not created!" };
				}
				return studentParent;
			} else {
				return { error: true, status: 400, message: "Studetn not found!" };
			}
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async createParentWithStudents(students) {
		try {
			for (const student of students) {
				if (!student?.parent) {
					throw SequelizeError({
						error: true,
						status: 400,
						message: "Email must exist!",
					});
				}

				if (!validation.isEmailUniqueInAllTables(student.parent)) {
					throw SequelizeError({
						error: true,
						status: 400,
						message: "Email already exists!",
					});
				}

				const datas = {
					loginId: await this.recursionId(generateLoginId()),
					password: generatePassword(),
					email: student.parent,
				};
				logger.log(student.email.split("@")[0]);

				const studentRecord = await this.models.Students.findOne({
					where: { loginId: student.email.split("@")[0] },
				});

				if (!studentRecord) {
					throw new Error("Student not found");
				}

				let parent;
				try {
					console.log(datas);
					parent = await this.models.Parents.create(datas, {
						returning: true,
					});
				} catch (validationError) {
					throw SequelizeError({
						error: true,
						status: 400,
						message: validationError,
					});
				}

				console.log(studentRecord, parent);

				if (parent) {
					await sendEmail({
						to: student.parent,
						subject: "JDUポートフォリオシステムの登録情報",
						html: welcomeTemplate({
							loginId: datas.email,
							password: datas.password,
						}),
					});

					await this.models.StudentParents.create({
						StudentId: studentRecord.id,
						ParentId: parent.id,
					});
				}
			}
			return "Parents created";
		} catch (error) {
			throw error;
		}
	}

	async edit(id, body) {
		try {
			if (body?.avatar == " ") {
				body.avatar = null;
			}

			const [_, parent] = await this.models.Parents.update(body, {
				where: { id },
				returning: true,
				individualHooks: true,
			});
			return parent?.[0] || {};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async delete(id) {
		try {
			const response = await this.models.Parents.destroy({ where: { id } });
			return response;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async updateParentChild(id, loginId) {
		try {
			const check = validation.isLoginIdUniqueInAllTables(
				loginId.loginId || "*#/",
			);
			if (!check) {
				throw SequelizeError({ msg: "user not found" });
			}
			const StudentId = await this.models.Students.findOne({
				where: loginId,
			});

			await this.models.StudentParents.update(
				{ StudentId: StudentId?.id },
				{
					where: { ParentId: id },
				},
			);
		} catch (error) {
			throw SequelizeError(error);
		}
	}

	async recursionId(id) {
		const check = await validation.isLoginIdUniqueInAllTables(id);
		if (check) {
			return id;
		} else {
			return await this.recursionId(generateLoginId());
		}
	}

	async checkPassword(psw) {
		try {
			const response = await this.models.Parents.findOne({
				where: { password: sha256(psw) },
			});
			return response;
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new ParentServices(sequelize);
