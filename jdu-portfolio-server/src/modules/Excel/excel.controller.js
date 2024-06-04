const logger = require("../../services/logger.service");
const XLSX = require("xlsx");
const { unlink } = require("fs");

class ExcelController {
	async getAll(req, res) {
		try {
			const workbook = XLSX.readFile(req.pathName);
			const worksheet = workbook.Sheets["sheet"];
			const data = XLSX.utils.sheet_to_json(worksheet);

			unlink(req.pathName, (err) => {
				console.log(err);
			});

			res.status(200).send(data);
		} catch (error) {
			logger.error(error.message);
		}
	}
}

module.exports = ExcelController;
