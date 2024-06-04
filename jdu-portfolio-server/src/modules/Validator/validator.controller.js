const logger = require("../../services/logger.service");
const ValidatorService = require("./validator.service");

class ValidatorController {
	async validateLoginId(req, res) {
		try {
			const validate = await ValidatorService.isLoginIdUniqueInAllTables(
				req.params.id,
			);
			validate
				? res
						.status(200)
						.send({ message: "User already created!", error: true })
				: res.status(200).send({ message: "Correct!", error: false });
		} catch (error) {
			logger.error(error.message);
		}
	}
}

module.exports = ValidatorController;
