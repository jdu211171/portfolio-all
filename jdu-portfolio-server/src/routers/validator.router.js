const router = require("express").Router();
const ValidatorController = require("../modules/Validator/validator.controller");

const Controller = new ValidatorController();

router.get("/validate/:id", Controller.validateLoginId);

module.exports = router;
