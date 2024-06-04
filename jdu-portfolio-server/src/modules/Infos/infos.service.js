const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");

const infoModel = require("./infos.model");

class InfosService {
	constructor(sequelize) {
		infoModel(sequelize);
		this.models = sequelize.models;
	}

	async createInfo(data) {
		try {
			return await this.models.Infos.create(data);
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getAll() {
		try {
			return await this.models.Infos.findAll();
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async update(id, body) {
		try {
			const data = {};
			const [_, info] = await this.models.Infos.update(body, {
				where: { id },
				returning: true,
			});
			return info?.[0] || {};
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new InfosService(sequelize);
