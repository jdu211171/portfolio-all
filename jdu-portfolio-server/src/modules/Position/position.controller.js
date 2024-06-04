const logger = require("../../services/logger.service");
const PositionService = require("./position.service");

class PositionController {
	async getAll(req, res) {
		try {
			const response = await PositionService.getAll();
			res.status(200).send(response);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async create(req, res) {
		try {
			const response = await PositionService.create(req.body);
			res.status(201).send(response);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async edit(req, res) {
		try {
			const response = await PositionService.edit(req.params?.id, req.body);
			res.status(203).send(response);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async delete(req, res) {
		try {
			const response = await PositionService.delete(req.params?.id);
			res.status(204).send();
		} catch (error) {
			logger.error(error.message);
		}
	}
}

module.exports = PositionController;
