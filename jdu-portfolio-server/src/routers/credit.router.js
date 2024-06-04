const router = require('express').Router()
const CreditController = require('../modules/Credits/credit.controller')
const Controller = new CreditController()

router.get('/credits', Controller.getAll)
router.post('/credit', Controller.create)

module.exports = router