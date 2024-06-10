const sha256 = require("sha256");
const { sequelize } = require("../../services/sequelize.service.js");
const StudentModel = require("./student.model.js");
const SequelizeError = require("../../errors/sequelize.error.js");
const JapanLanguageTestModel = require("../JapanLanguageTests/JapanLanguageTest.model.js");
const ItQualificationModel = require("../ItQualifications/ItQualification.model.js");
const lessonModel = require("../Lessons/lesson.model.js");
const semesterModel = require("../Semesters/semester.model.js");
const logger = require("../../services/logger.service.js");
const { roles } = require("../../constants/server.constants.js");
const { Op } = require("sequelize");
const validation = require("../Validator/validator.service");
const { removeFile } = require("../../services/file.service");

class StudentServices {
	constructor(sequelize) {
		StudentModel(sequelize);
		JapanLanguageTestModel(sequelize);
		ItQualificationModel(sequelize);
		lessonModel(sequelize);
		semesterModel(sequelize);
		this.models = sequelize.models;
	}

	async create(body) {
		try {
			const validate = validation.email([body], true);

			if (validate.error) return validate;

			if (body?.email) {
				if (!validation.isEmailUniqueInAllTables(body.email))
					return SequelizeError({
						error: true,
						status: 400,
						message: "Email already exist!",
					});
				const emailInfo = body.email.split("@");
				if (emailInfo[1] !== "jdu.uz") {
					return SequelizeError({
						error: true,
						status: 400,
						message: "Email must be @jdu.uz",
					});
				}
			} else {
				return SequelizeError({
					error: true,
					status: 400,
					message: "Email must be exist!",
				});
			}

			const student = await this.models.Students.create(body, {
				individualHooks: true,
				include: [
					{ model: this.models.JapanLanguageTests, as: "japanLanguageTests" },
					{
						model: this.models.ItQualifications,
						as: "itQualification",
						include: [
							{
								model: this.models.ItQualificationResults,
								as: "skills",
								include: [{ model: this.models.Skills, as: "skill" }],
							},
						],
					},
					{
						model: this.models.Lessons,
						as: "lessons",
						include: [
							{
								model: this.models.Semesters,
								as: "semesters",
								include: [
									{
										model: this.models.LessonResults,
										as: "results",
										individualHooks: true,
									},
								],
							},
						],
					},
				],
			});

			return student;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getAll({
		page = 1,
		limit = 10,
		role,
		userId = "",
		search,
		group,
		year,
		rate,
		isArchive = false,
		jdu,
		jlpt,
		groups,
	}) {
		try {
			let groupWhere = {};
			if (
				role == roles.RECRUITOR &&
				(groups == "First" || groups == "Second")
			) {
				groupWhere = {
					[Op.or]: [
						{ name: { [Op.eq]: "Third" } },
						{ name: { [Op.eq]: "Fourth" } },
					],
				};
			} else {
				groupWhere = { name: { [Op.eq]: group } };
			}
			let students = await this.models.Students.findAndCountAll({
				distinct: true,
				where: {
					isDeleted: false,
					isActive: true,
					isArchive: isArchive,
					...(search && {
						[Op.or]: [
							{ firstName: { [Op.iLike]: "%" + search + "%" } },
							{ lastName: { [Op.iLike]: "%" + search + "%" } },
						],
					}),
					...(jdu && { jdu: { [Op.eq]: jdu } }),
					...(jlpt && { jlpt: { [Op.eq]: jlpt } }),
				},
				order: [["createdAt", "DESC"]],
				attributes: {
					exclude: [
						"password",
						"isDeleted",
						"email",
						"role",
						"bio",
						"images",
						"videos",
						"updatedAt",
					],
					include:
						role === roles.RECRUITOR
							? [
									[
										sequelize.literal(
											`(SELECT EXISTS(SELECT * FROM "SelectedStudents" WHERE "StudentId" = "Students".id AND "RecruitorId" = '${userId}'))`,
										),
										"isSelected",
									],
							  ]
							: [],
				},
				include: [
					// { model: this.models.JapanLanguageTests, as: 'japanLanguageTests', attributes: { exclude: ['studentId'] } },
					{
						model: this.models.Group,
						as: "group",
						where: {
							...(groups && { name: { [Op.iLike]: "%" + groups + "%" } }),
							...(group && groupWhere),
							...(year && { year: { [Op.eq]: year } }),
						},
						required: group ? true : groups ? true : year ? true : false,
					},
				],
				offset: (page - 1) * limit,
				limit,
			});

			return students;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async update(id, body) {
		try {
			if (body.groupId === "null") {
				body.groupId = null;
			}
			if (body.avatar == " ") {
				body.avatar = null;
			}
			const [status, student] = await this.models.Students.update(
				{ ...body, isActive: true },
				{
					where: { id },
					returning: true,
					individualHooks: true,
				},
			);
			// if (status === 0) return SequelizeError(new Error("Student not found"));

			if (Array.isArray(body?.japanLanguageTests)) {
				await Promise.all(
					body?.japanLanguageTests?.map(async (test) => {
						try {
							const prevTest = await this.models.JapanLanguageTests.findOne({
								where: { studentId: id, id: test?.id || null },
							});
							if (prevTest) {
								await this.models.JapanLanguageTests.update(test, {
									where: { id: test.id || null },
								});
							} else {
								await this.models.JapanLanguageTests.create({
									...test,
									studentId: id,
								});
							}
						} catch (error) {
							logger.error(error.message);
						}
					}),
				);
			}

			if (body?.itQualification) {
				let itQualification = await this.models.ItQualifications.findOne({
					where: { studentId: id },
				});
				await this.models.ItQualifications.update(
					{ description: body?.itQualification?.description },
					{ where: { studentId: id }, returning: true },
				);

				// if (Array.isArray(body?.itQualification?.skills)) {
				// 	await Promise.all(
				// 		body?.itQualification?.skills?.map(async (skill) => {
				// 			try {
				// 				const result = await this.models.ItQualificationResults.findOne(
				// 					{
				// 						where: {
				// 							[Op.and]: [
				// 								{ ItQualificationId: itQualification?.dataValues?.id },
				// 								{ skillId: skill?.skillId },
				// 							],
				// 						},
				// 					},
				// 				);

				// 				if (result) {
				// 					await this.models.ItQualificationResults.update(
				// 						{ procent: skill?.procent },
				// 						{
				// 							where: {
				// 								[Op.and]: [
				// 									{
				// 										ItQualificationId: itQualification?.dataValues?.id,
				// 									},
				// 									{ skillId: skill?.skillId },
				// 								],
				// 							},
				// 						},
				// 					);
				// 				} else {
				// 					await this.models.ItQualificationResults.create({
				// 						...skill,
				// 						ItQualificationId: itQualification?.dataValues?.id,
				// 					});
				// 				}
				// 			} catch (error) {
				// 				logger.error(error.message);
				// 			}
				// 		}),
				// 	);
				// }
			}

			return student?.[0];
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async checkPassword(psw) {
		try {
			const student = await this.models.Students.findOne({
				where: { password: sha256(psw) },
			});
			return student;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async delete(id) {
		try {
			const student = this.models.Students.update(
				{ isDeleted: true },
				{ where: { id } },
			);
			return student;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async findByLogin(id) {
		try {
			console.log(id);
			if (id) {
				let student = await this.models.Students.findOne({
					where: {
						loginId: { [Op.eq]: id },
						isDeleted: false,
						isArchive: false,
					},
					attributes: {
						exclude: [
							"password",
							"createdAt",
							"updatedAt",
							"groupId",
							"bio",
							"desc",
							"cv",
							"jdu",
							"jlpt",
						],
					},
				});
				if (student) {
					student = { ...student.dataValues };				
				}

				return student?.isDeleted ? {} : student;
			}
			return {};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async findByPk(id) {
		try {
			const student = await this.models.Students.findByPk(id, {
				where: { isDeleted: false, isArchive: false },
				include: [
					{
						model: this.models.Group,
						as: "group",
					},
				],
				attributes: { exclude: ["password", "isDeleted"] },
			});
			student.japanLanguageTests = [
				student.japanLanguageTests?.find((e) => e.name === "JLPT"),
				student.japanLanguageTests?.find((e) => e.name === "NAT"),
			];
			return student?.isDeleted ? {} : student;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getTopStudents({ page = 1, limit = 10 }) {
		try {
			const topStudents = await this.models.Students.findAndCountAll({
				where: { isDeleted: false, isActive: true, isArchive: false },
				attributes: ["id", "firstName", "lastName", "avatar"],
				offset: (page - 1) * limit,
				limit,
			});
			return topStudents;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getCertificatesCount() {
		try {
			const N1 = await this.models.JapanLanguageTests.count({
				where: { name: "JLPT", level: "N1" },
			});
			const N2 = await this.models.JapanLanguageTests.count({
				where: { name: "JLPT", level: "N2" },
			});
			const N3 = await this.models.JapanLanguageTests.count({
				where: { name: "JLPT", level: "N3" },
			});
			const N4 = await this.models.JapanLanguageTests.count({
				where: { name: "JLPT", level: "N4" },
			});
			const N5 = await this.models.JapanLanguageTests.count({
				where: { name: "JLPT", level: "N5" },
			});

			const Q1 = await this.models.JapanLanguageTests.count({
				where: { name: "NAT" },
			});
			const Q2 = await this.models.JapanLanguageTests.count({
				where: { name: "NAT", level: "Q2" },
			});
			const Q3 = await this.models.JapanLanguageTests.count({
				where: { name: "NAT", level: "Q3" },
			});
			const Q4 = await this.models.JapanLanguageTests.count({
				where: { name: "NAT", level: "Q4" },
			});

			const students = await this.models.Students.count({
				where: { isDeleted: false },
			});

			return {
				JLPT: { N1, N2, N3, N4, N5 },
				NAT: { Q1, Q2, Q3, Q4 },
				students,
			};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async createSertification(datas) {
		try {
			for (const student of datas) {
				const regex = /^N[1-5]$/;
				let data = {};

				if (student?.JLPT) {
					if (regex.test(student.JLPT)) data = { ...data, jlpt: student.JLPT };
					else
						return { error: true, message: `JLPT incorrect: ${student.JLPT}` };
				}
				if (student?.JDU) {
					if (regex.test(student.JDU)) data = { ...data, jdu: student.JDU };
					else return { error: true, message: `JDU incorrect: ${student.JDU}` };
				}

				const studentInfo = await this.models.Students.findOne({
					where: { loginId: `${student.id}` },
				});

				if (!studentInfo) {
					return { error: true, message: `Studetn not found!` };
				}
				await this.models.Students.update(data, {
					where: { id: studentInfo.id },
				});
			}

			return "created";
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getSertification() {
		try {
			const data = {
				JLPT: {},
				JDU: {},
				student: 0,
			};

			const whereCondition = {
				isDeleted: false,
				isActive: true,
				isArchive: false,
			};

			data.student =
				(await this.models.Students.count({
					where: whereCondition,
				})) || 0;

			const jlptLevels = ["N1", "N2", "N3", "N4", "N5"];

			for (const level of jlptLevels) {
				data.JLPT[level] = await this.models.Students.count({
					where: { jlpt: level, ...whereCondition },
				});

				data.JDU[level.replace(/N/, "Q")] = await this.models.Students.count({
					where: { jdu: level, ...whereCondition },
				});
			}

			return data;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async archiveGroup({ page = 1, limit = 10, search, year, role }) {
		try {
			if (role && role == "decan") {
				const archive = await this.models.Students.findAndCountAll({
					where: {
						isDeleted: false,
						isActive: true,
						isArchive: true,
						...(search && {
							[Op.or]: [
								{ firstName: { [Op.iLike]: "%" + search + "%" } },
								{ lastName: { [Op.iLike]: "%" + search + "%" } },
							],
						}),
					},
					exclude: ["password", "isDeleted", "images", "videos", "updatedAt"],
					include: [
						{
							model: this.models.Group,
							as: "group",
							where: {
								...(year && {
									year: { [Op.eq]: year },
								}),
							},
						},
					],
					offset: (page - 1) * limit,
					limit,
				});

				delete archive.rows;
				return archive;
			}

			return SequelizeError({ message: "You don't have access!" });
		} catch (err) {
			return SequelizeError(err);
		}
	}

	async removeAvatar(id) {
		const updateAvatarToNull = async (Model, id) => {
			const instance = await Model.findOne({ where: { id } });
			if (instance) {
				await Model.update({ avatar: null }, { where: { id } });
			}
		};

		try {
			await Promise.all([
				updateAvatarToNull(this.models.Students, id),
				updateAvatarToNull(this.models.Teachers, id),
				updateAvatarToNull(this.models.Decan, id),
				updateAvatarToNull(this.models.Recruitors, id),
			]);

			return {
				error: false,
				status: 204,
				message: "Succesfully deleted avatar!",
			};
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new StudentServices(sequelize);
