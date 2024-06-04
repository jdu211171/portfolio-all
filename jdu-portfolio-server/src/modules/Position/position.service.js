const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const positionModel = require("./position.model");

class PositionServices {
	constructor(sequelize) {
		positionModel(sequelize);
		this.models = sequelize.models;
	}

	async getAll() {
		try {
			const response = await this.models.Positions.findAll();
			return response;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async create(body) {
		try {
			const response = await this.models.Positions.create(body);
			return response;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async edit(id, body) {
		try {
			const [_, position] = await this.models.Positions.update(body, {
				where: { id },
				returning: true,
			});
			return position?.[0] || {};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async delete(id) {
		try {
			const response = await this.models.Positions.destroy({ where: { id } });
			return response;
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new PositionServices(sequelize);
