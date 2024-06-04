const groupService = require("./group.service");

class GroupController {
	async getAllGroups(req, res) {
		try {
			res.status(200).send(await groupService.getAll(req.query));
		} catch (err) {
			console.log(err);
		}
	}
	async getById(req, res) {
		try {
			const data = await groupService.getById(req.params.id);
			res.status(200).send(data);
		} catch (err) {
			console.log(err);
		}
	}
	async delete(req, res, next) {
		try {
			const data = await groupService.delete(req.params.id);
			res.status(204).send(data);
		} catch (err) {
			next(err);
		}
	}
	async create(req, res) {
		try {
			res.status(201).send(await groupService.create(req.body));
		} catch (err) {
			console.log(err);
		}
	}
	async edit(req, res) {
		try {
			const group = await groupService.edit(req.params?.id, req.body);
			res.status(203).send(group);
		} catch (error) {
			logger.error(error.message);
		}
	}
}

module.exports = GroupController;
