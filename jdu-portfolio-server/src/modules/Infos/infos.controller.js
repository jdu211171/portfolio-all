const logger = require("../../services/logger.service");
const InfosService = require("./infos.service");

class InfosController {
	async getAll(_, res) {
		try {
			res.status(200).send(await InfosService.getAll());
		} catch (error) {
			logger.error(error.message);
		}
	}

	async create(req, res) {
		try {
			res.status(201).send(await InfosService.createInfo(req.body));
		} catch (error) {
			logger.error(error.message);
		}
	}

	async update(req, res) {
		try {
			res.status(203).send(await InfosService.update(req.params?.id, req.body));
		} catch (error) {
			logger.error(error.message);
		}
	}
}

module.exports = InfosController;
