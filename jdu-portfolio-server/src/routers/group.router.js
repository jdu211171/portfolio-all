const router = require("express").Router();
const GropController = require("../modules/Group/group.controller");
const Controller = new GropController();

router.get("/group", Controller.getAllGroups);
router.get("/group/:id", Controller.getById);
router.post("/group", Controller.create);
router.put("/group/:id", Controller.edit);
router.delete("/group/:id", Controller.delete);

module.exports = router;
