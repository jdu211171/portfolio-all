const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const sectionModel = require("./section.model");

class SectionsServices {
	constructor(sequelize) {
		sectionModel(sequelize);
		this.models = sequelize.models;
	}

	async getAll(sectionId = null) {
		try {
			const whereCondition = sectionId ? { id: sectionId } : {};

			return await this.models.Sections.findAll({
				where: whereCondition,
				include: {
					model: this.models.Specialisations,
					as: "specialisations",
				},
			});
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async create(body) {
		try {
			return await this.models.Sections.create(body);
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async edit(id, body) {
		try {
			const [_, section] = await this.models.Sections.update(body, {
				where: { id },
				returning: true,
			});
			return section?.[0] || {};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async delete(id) {
		try {
			return await this.models.Sections.destroy({ where: { id } });
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new SectionsServices(sequelize);
