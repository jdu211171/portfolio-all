const CreditService = require("./credit.service")

class CreditController{
    async create(req, res) {
        try {
            const result = await CreditService.create(req.body)
            res.status(201).send(result)
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(req, res) {
        try {
            const result = await CreditService.get()
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CreditController