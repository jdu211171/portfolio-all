const logger = require("../../services/logger.service");
const ParentService = require("./parent.service");
const XLSX = require("xlsx");
const { unlink } = require("fs");
const { roles } = require("../../constants/server.constants.js");
const { uploadFile, removeFile } = require("../../services/file.service.js");
const ExpressError = require("../../errors/express.error");

class ParentController {
	async getAll(req, res) {
		try {
			const response = await ParentService.getAll(req.query);
			res.status(200).send({ count: response.length, rows: response });
		} catch (error) {
			logger.error(error.message);
		}
	}

	async getOne(req, res) {
		try {
			const response = await ParentService.getOne(req.params.id);
			res.status(200).send(response);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async create(req, res) {
		try {
			const response = await ParentService.create(req.body);
			if (response?.error) {
				return res.status(400).send(response.message);
			}

			res.status(201).send(response);
		} catch (error) {
			logger.error(error.message);
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

			const response = await ParentService.createParentWithStudents(data);

			if (response?.error) {
				return res.status(400).send(response.message);
			}

			res.status(201).send(response);
		} catch (error) {
			logger.error(error.message);
			next(error);
		}
	}

	async edit(req, res) {
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
					const parent = await ParentService.checkPassword(
						body.currentPassword,
					);
					if (!parent || parent.error) {
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

			if (body?.studentId) {
				await ParentService.updateParentChild(req.params?.id, {
					loginId: body.studentId,
				});
				delete body.studentId;
			}

			body.isActive = true;
			const response = await ParentService.edit(req.params?.id, body);

			if (response?.error) {
				res.status(400).send(response);
				return;
			}
			res.status(203).send(response);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res) {
		try {
			const response = await ParentService.edit(req.params?.id, {
				isDeleted: true,
			});
			res.status(204).send(response);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async updatadeParentChild(req, res) {
		try {
			const data = await ParentService.updateParentChild(req.params.id, {
				loginId: req.body.loginId,
			});

			res.json(data);
		} catch (error) {
			logger.error(error);
		}
	}
}

module.exports = ParentController;
