const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const creditModel = require("../Credits/credit.model");
const CreditModel = require("./credit.model");

class CreditServices {
    constructor(sequelize) {
        CreditModel(sequelize)
        creditModel(sequelize)
        this.models = sequelize.models
    }

    async get() {
        try {
            const result = await this.models.Credits.findAll()
            return result
        } catch (error) {
            return SequelizeError(error)
        }
    }

    async create(body) {
        try {
            const result = await this.models.Credits.create(body, { returning: true })
            return result
        } catch (error) {
            return SequelizeError(error)
        }
    }

    async update(id, body) {
        try {
            const [_, result] = await this.models.Credits.update(body, { where: { id }, returning: true})
            return result?.[0] || {}
        } catch (error) {
            return SequelizeError(error)
        }
    }
}

module.exports = new CreditServices(sequelize)