const logger = require("../../services/logger.service");
const SectionService = require("./section.service");

class SectionController {
	async getAll(req, res) {
		try {
			const section = await SectionService.getAll(req.query.sectionId || null);
			res.status(200).send(section);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async create(req, res) {
		try {
			const section = await SectionService.create(req.body);
			res.status(201).send(section);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async edit(req, res) {
		try {
			const section = await SectionService.edit(req.params?.id, req.body);
			res.status(203).send(section);
		} catch (error) {
			logger.error(error.message);
		}
	}

	async delete(req, res) {
		try {
			const section = await SectionService.delete(req.params?.id);
			res.status(204).send("deleted");
		} catch (error) {
			logger.error(error.message);
		}
	}
}

module.exports = SectionController;
