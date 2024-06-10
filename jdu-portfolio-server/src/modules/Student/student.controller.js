const { welcomeTemplate, subject } = require("../../configs/email.config.js");
const { roles } = require("../../constants/server.constants.js");
const { defaultStudetnValue } = require("../../constants/student.constants.js");
const ExpressError = require("../../errors/express.error.js");
const sendEmail = require("../../services/email.service.js");
const { uploadFile, removeFile } = require("../../services/file.service.js");
const {
	generatePassword,
	generateLoginId,
} = require("../../utils/generator.js");
const StudentServices = require("./student.service.js");
const XLSX = require("xlsx");
const validate = require("../../utils/excelValidation");
const { default: axios } = require("axios");

const { unlink } = require("fs");
const { Query } = require("pg");

class StudentController {
	constructor() {}
	async getStudents(req, res) {
		try {
			const query = req.query;

			const students = await StudentServices.getAll({
				role: req.role,
				userId: req.user?.id,
				...req.query,
			});

			res.status(200).send(students);
		} catch (error) {
			console.log(error);
		}
	}

	async getArchiveStudents(req, res) {
		try {
			const students = await StudentServices.archiveGroup({
				role: req.role,
				...req.query,
			});

			res.status(200).send(students);
		} catch (error) {
			console.log(error);
		}
	}

	async createStudent(req, res, next) {
		try {
			const avatar = req?.files?.avatar;
			const cv = req?.files?.cv;
			const body = req?.body;

			body.password = body.password || generatePassword();

			if (avatar) {
				const studentAvatar = await uploadFile({ file: avatar });
				if (studentAvatar?.url) body.avatar = studentAvatar.url;
				else throw new ExpressError("avatar is not uploaded");
			}

			if (cv) {
				const studentCv = await uploadFile({ file: cv });
				if (studentCv?.url) body.cv = studentCv.url;
				else throw new ExpressError("cv is not uploaded");
			}

			const student = await StudentServices.create({
				...defaultStudetnValue,
				...body,
			});
			if (student?.error) {
				if (body?.avatar) await removeFile(body.avatar);
				if (body?.cv) await removeFile(body.cv);
				throw new ExpressError(student.message, student.status);
			}

			await sendEmail({
				to: body.email,
				subject: "JDUポートフォリオシステムの登録情報",
				html: welcomeTemplate({
					loginId: body.email,
					password: body.password,
				}),
			});

			res.status(201).send(student);
		} catch (error) {
			next(error);
		}
	}

	async createStudentAlbom(req, res, next) {
		try {
			const image = req.files.image;
			if (image) {
				const studentImage = await uploadFile({ file: image });
				if (studentImage?.url) {
					res.status(203).send(studentImage.url);
				} else {
					throw new ExpressError("Image not uploaded");
				}
			}
		} catch (error) {
			next(error);
		}
	}

	async createStudentWithExcel(req, res, next) {
		try {
			const workbook = XLSX.readFile(req.pathName);
			const worksheet = workbook.Sheets["sheet"];
			const data = XLSX.utils.sheet_to_json(worksheet);

			unlink(req.pathName, (err) => {
				console.log(err);
			});

			for (let i = 0; i < data.length; i++) {
				data[i].password = data[i].password || generatePassword();
				const datas = {
					loginId: data[i]?.id,
					password: data[i].password,
					firstName: data[i]?.firstName || "-",
					lastName: data[i]?.lastName || "-",
					groupId: req.body.groupId,
					email: data[i].email,
				};
				const student = await StudentServices.create({
					...defaultStudetnValue,
					...datas,
				});

				if (student?.error) {
					throw new ExpressError(student.message, student.status);
				}

				await sendEmail({
					to: datas.email,
					subject: "JDUポートフォリオシステムの登録情報",
					html: welcomeTemplate({
						loginId: datas.email,
						password: datas.password,
					}),
				});
			}

			res.status(201).send(data);
		} catch (error) {
			next(error);
		}
	}

	async readExcel(req, res, next) {
		try {
			const workbook = XLSX.readFile(req.pathName);
			const worksheet = workbook.Sheets["sheet"];
			const data = XLSX.utils.sheet_to_json(worksheet);
			unlink(req.pathName, (err) => {
				console.log(err);
			});

			const error = validate(data, "student");
			if (error.error) {
				res.status(400).send(error);
				return;
			}
			res.status(200).send(data);
		} catch (error) {
			next(error);
		}
	}

	async updateStudent(req, res, next) {
		try {
			const body = req.body;

			if (!body) {
				res.send(201);
				return;
			}

			if (body?.loginId) delete body.loginId;

			req.body.images =
				req?.body?.images == "null"
					? null
					: typeof req.body.images == "string"
					? JSON.parse(req.body.images)
					: req.body.images;


			if (
				req.user.id === req.params.id ||
				req.role === roles.DECAN ||
				req.role === roles.TEACHER ||
				req.role === roles.STAFF
			) {
				if (req.role !== roles.DECAN) {
					if (body.password && !body.currentPassword) {
						throw new ExpressError("current password is required", 400);
					} else if (body.password && body.confirmPassword === body.password) {
						const student = await StudentServices.checkPassword(
							body.currentPassword,
						);
						if (!student || student.error) {
							throw new ExpressError("current password is not correct", 400);
						}
					} else if (body.password && body.confirmPassword !== body.password) {
						throw new ExpressError("confirm password is not correct", 400);
					}
				}
			} else throw new ExpressError("You dont have permission", 403);

			body.isActive = true;
			const student = await StudentServices.update(req.params.id, body);
			if (student?.error) {
				if (body.avatar) await removeFile(body.avatar);
				throw new ExpressError(student.message, student.status);
			}
			res.status(203).send(student);
		} catch (error) {
			next(error);
		}
	}

	async deleteStudent(req, res) {
		try {
			const student = await StudentServices.delete(req.params.id);

			res.status(204).send({ error: false, message: "Deleted", data: null });
		} catch (error) {
			console.log(error);
		}
	}

	async findByLoginId(req, res) {
		try {
			const student = await StudentServices.findByLogin(req?.params?.id);

			res.status(200).send(student);
			return;
		} catch (error) {
			console.log(error);
		}
	}

	async findById(req, res) {
		try {
			const student = await StudentServices.findByPk(req.params.id);
			res.status(200).send(student);
		} catch (error) {
			console.log(error);
		}
	}

	async getTopStudents(req, res) {
		try {
			const topStudents = await StudentServices.getTopStudents({
				page: req.query?.page,
				limit: req.query?.limit,
			});
			res.status(200).send(topStudents);
		} catch (error) {}
	}

	async getCertificatesCount(req, res) {
		try {
			const count = await StudentServices.getSertification();
			res.status(200).json(count);
		} catch (error) {
			console.log(error);
		}
	}


	async createCertification(req, res) {
		try {
			const workbook = XLSX.readFile(req.pathName);
			const worksheet = workbook.Sheets["sheet"];
			const data = XLSX.utils.sheet_to_json(worksheet);

			unlink(req.pathName, (err) => {
				console.log(err);
			});

			const student = await StudentServices.createSertification(data);

			if (student?.error) {
				res.status(400).send(student);
				return;
			}

			res.send("created");
		} catch (error) {
			next(error);
		}
	}

	async removeAlbome(req, res) {
		try {
			if (req?.query?.url) {
				await removeFile(req?.query?.url);
				res.status(203).send({
					error: false,
					message: "Photo removed succesfully!",
					status: 203,
				});
			} else {
				res.status(400).send({
					error: true,
					message: "Photo not removed!!",
					status: 400,
				});
			}
		} catch (err) {
			next(err);
		}
	}

	async removeAvatar(req, res, next) {
		try {
			const response = await StudentServices.removeAvatar(req.params.id);

			if (response?.error) {
				next(response.error);
			}
			res.send(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = StudentController;
