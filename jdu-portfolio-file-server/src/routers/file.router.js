const router = require('express').Router()
const FileController = require('../controllers/file.controller')

const Controller = new FileController()

router.post('/upload/file', Controller.uploadFile)

module.exports = router