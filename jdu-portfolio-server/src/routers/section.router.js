const router = require("express").Router();
const SectionController = require("../modules/Section/section.controller");
const Controller = new SectionController();

router.get("/section", Controller.getAll);
router.post("/section", Controller.create);

module.exports = router;
