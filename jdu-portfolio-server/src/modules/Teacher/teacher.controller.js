const { welcomeTemplate, subject } = require("../../configs/email.config");
const { roles } = require("../../constants/server.constants.js");
const ExpressError = require("../../errors/express.error");
const sendEmail = require("../../services/email.service");
const { uploadFile, removeFile } = require("../../services/file.service");
const { generatePassword } = require("../../utils/generator");
const TeacherService = require("./teacher.service");
const XLSX = require("xlsx");
const { unlink } = require("fs");

class TeacherController {
	async getAll(req, res, next) {
		try {
			const teachers = await TeacherService.getAll(req.query);
			res.status(200).send(teachers);
		} catch (error) {
			next(error);
		}
	}

	async getOne(req, res, next) {
		try {
			const teacher = await TeacherService.getOne(req.params.id);
			res.status(200).send(teacher);
		} catch (error) {
			next(error);
		}
	}

	async create(req, res, next) {
		try {
			let body = req.body;
			body.password = body.password || generatePassword();

			const teacher = await TeacherService.create(body);
			if (teacher?.error) {
				if (body.avatar) await removeFile(body.avatar);
				throw new ExpressError(teacher.message, teacher.status);
			}

			await sendEmail({
				to: body.email,
				subject: "JDUポートフォリオシステムの登録情報",
				html: welcomeTemplate({
					loginId: body.email,
					password: body.password,
				}),
			});

			res.status(201).send(teacher);
		} catch (error) {
			next(error);
		}
	}

	async createWithExcel(req, res, next) {
		try {
			const workbook = XLSX.readFile(req.pathName);
			const worksheet = workbook.Sheets["sheet"];
			const data = XLSX.utils.sheet_to_json(worksheet);

			unlink(req.pathName, (err) => {
				console.log(err);
			});

			for (let i = 0; i < data.length; i++) {
				if (!data[i].email) {
					throw new ExpressError("Email doesn't exist", 400);
				}
				data[i].password = data[i].password || generatePassword();
				const datas = {
					loginId: data[i].id,
					password: data[i].password,
					role: req.body.role,
					email: data[i].email,
					...(data[i].firstName && { firstName: data[i].firstName }),
					...(data[i].lastName && { lastName: data[i].lastName }),
				};
				const teacher = await TeacherService.create(datas);

				if (teacher?.error) {
					throw new ExpressError(teacher.message, teacher.status);
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

	async update(req, res, next) {
		try {
			const body = req.body;

			if (req.user.id === req.params.id || req.role === roles.DECAN) {
				if (body.password && !body.currentPassword) {
					res.status(400).send({
						error: true,
						status: 400,
						message: "current password is required",
					});
					return;
				} else if (body.password && body.confirmPassword === body.password) {
					const teacher = await TeacherService.checkPassword(
						body.currentPassword,
					);
					console.log("teacher", teacher);
					console.log("password", body?.currentPassword);
					if (!teacher || teacher.error) {
						res.status(400).send({
							error: true,
							status: 400,
							message: "currentPassword is not correct",
						});
						return;
					}
				} else if (body.password && body.confirmPassword !== body.password) {
					res.status(400).send({
						error: true,
						status: 400,
						message: "confirmPassword password is not correct",
					});
					return;
				}
			} else {
				res.status(400).send({
					error: true,
					status: 400,
					message: "You don't have permission",
				});
				return;
			}

			const teacher = await TeacherService.update(req.params?.id, body);
			res.status(203).send(teacher);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			const response = await TeacherService.update(req.params.id, {
				isDeleted: true,
			});

			res.send(response);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = TeacherController;
