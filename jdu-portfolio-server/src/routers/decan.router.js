const router = require("express").Router();
const DecanController = require("../modules/Decan/decan.controller.js");
const Controller = new DecanController();

router.get("/decan", Controller.getDecan);
router.get("/decan/percentages", Controller.percentages);
router.put("/decan", Controller.update);

module.exports = router;
