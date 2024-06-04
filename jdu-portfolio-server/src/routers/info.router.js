const router = require("express").Router();
const InfosController = require("../modules/Infos/infos.controller");
const Controller = new InfosController();

router.get("/infos", Controller.getAll);
router.put("/infos/:id", Controller.update);
router.post("/infos", Controller.create);

module.exports = router;
