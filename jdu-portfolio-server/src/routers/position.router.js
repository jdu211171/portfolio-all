const router = require("express").Router();
const CreditController = require("../modules/Position/position.controller");
const Controller = new CreditController();

router.get("/position", Controller.getAll);
router.put("/position/:id", Controller.edit);
router.post("/position", Controller.create);
router.delete("/position/:id", Controller.delete);

module.exports = router;
